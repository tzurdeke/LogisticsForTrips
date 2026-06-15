import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bus, Package, LayoutDashboard, ChevronRight, 
  Search, Plus, Edit, Trash2, FileText, Download, 
  Shield, LogOut, User, MapPin, Calendar, Users, 
  CheckCircle2, AlertCircle, Clock, MessageSquare,
  ChevronDown, X, Menu, Settings, Info,
  Truck, UserPlus, Building2, Map, ShieldAlert, Check, Sparkles, Plane, Database, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GoogleGenAI } from "@google/genai";
import * as idb from 'idb-keyval';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Trip {
  id: string;
  tripNumber: string;
  tripName: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  tripType: string;
  imageUrl?: string;
}

interface Location {
  id: string;
  locationName: string;
  region: string;
  address: string;
  zipCode?: string;
  description: string;
  tripId?: string;
  supplierId?: string;
  visitDateTime?: string;
  locationOrder?: number;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: string;
  age: number;
}

interface Supplier {
  id: string;
  supplierNumber?: string;
  companyName: string;
  serviceType: 'Equipment' | 'Transportation' | 'Venue';
  contactPhone: string;
  tripId?: string;
}

interface Transportation {
  id: string;
  transportationNumber?: string;
  departureDateTime: string;
  arrivalDateTime: string;
  departureTime?: string;
  arrivalTime?: string;
  vehicleType: string;
  capacity: number;
  tripId: string;
  fromLocationId: string;
  toLocationId: string;
  fromAddress?: string;
  toAddress?: string;
  status?: string;
  supplierId?: string;
  comments?: any[];
  acknowledgedBy?: string[];
}

interface Equipment {
  id: string;
  itemName: string;
  totalInStock: number;
  supplierId?: string;
  tripId?: string;
}

interface TripEquipment {
  id: string;
  tripId: string;
  equipmentId: string;
  quantityAllocated: number;
  checkoutDate: string;
  returnDate: string;
  status?: string;
  supplierId?: string;
  comments?: any[];
  acknowledgedBy?: string[];
}

interface Registration {
  id: string;
  tripId: string;
  participantId: string;
  registrationDate: string;
  status: string;
  transportationId?: string;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'tourist';
}

// --- Components ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger', size?: 'sm' | 'md' | 'lg', loading?: boolean }>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-olive-600 text-white hover:bg-olive-700 shadow-sm',
      secondary: 'bg-sand-200 text-sand-900 hover:bg-sand-300',
      outline: 'border-2 border-olive-600 text-olive-600 hover:bg-olive-50',
      ghost: 'text-sand-600 hover:bg-sand-100',
      danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm'
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn('inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none', variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>שומר...</span>
          </div>
        ) : children}
      </button>
    );
  }
);

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn('w-full px-4 py-2.5 bg-white border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:border-olive-500 transition-all', className)}
      {...props}
    />
  )
);

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-sand-950/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-sand-100 flex items-center justify-between bg-sand-50/50">
            <h3 className="text-lg font-semibold serif text-sand-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-sand-100 rounded-full transition-colors">
              <X size={20} className="text-sand-400" />
            </button>
          </div>
          <div className="p-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- Searchable Select Component ---
const SearchableSelect = ({ 
  name, 
  options, 
  defaultValue, 
  placeholder, 
  label,
  allowCustom = false
}: { 
  name: string, 
  options: { id: string, label: string }[], 
  defaultValue?: string, 
  placeholder: string,
  label: string,
  allowCustom?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(defaultValue || '');
  const [customValue, setCustomValue] = useState('');
  
  useEffect(() => {
    setSelectedId(defaultValue || '');
    if (allowCustom && defaultValue && !options.find(o => o.id === defaultValue)) {
      setCustomValue(defaultValue);
    }
  }, [defaultValue, options, allowCustom]);

  const selectedOption = options.find(o => o.id === selectedId);
  const displayValue = isOpen ? searchTerm : (selectedOption ? selectedOption.label : (allowCustom ? customValue : ''));

  const filteredOptions = options.filter(o => 
    o.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-1.5 relative">
      <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          autoComplete="off"
          className="w-full px-4 py-2.5 bg-white border border-sand-200 rounded-xl text-sm text-right focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:border-olive-500 pr-10"
          placeholder={placeholder}
          value={displayValue}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (allowCustom) {
              setCustomValue(e.target.value);
              setSelectedId(e.target.value); // Use typed value as ID if custom allowed
            }
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setIsOpen(false);
            }
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm('');
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsOpen(false);
              setSearchTerm('');
            }, 200);
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sand-400">
          <Search size={16} />
        </div>
      </div>
      <input type="hidden" name={name} value={selectedId} />
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-sand-200 rounded-xl shadow-xl max-h-60 overflow-y-auto scrollbar-hide">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <button
                key={option.id}
                type="button"
                className={cn(
                  "w-full px-4 py-3 text-right text-sm hover:bg-olive-50 transition-colors flex items-center justify-between",
                  selectedId === option.id && "bg-olive-50 text-olive-700 font-bold"
                )}
                onClick={() => {
                  setSelectedId(option.id);
                  if (allowCustom) setCustomValue(option.label);
                  setSearchTerm('');
                  setIsOpen(false);
                }}
              >
                {selectedId === option.id && <div className="w-1.5 h-1.5 rounded-full bg-olive-500" />}
                <span>{option.label}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-right text-xs text-sand-400 italic">
              {allowCustom && searchTerm ? `לחץ Enter כדי להוסיף "${searchTerm}"` : 'לא נמצאו תוצאות'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'tourist' | null>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [transportation, setTransportation] = useState<Transportation[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [tripEquipment, setTripEquipment] = useState<TripEquipment[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAiImageDisabled, setIsAiImageDisabled] = useState(false);
  const [isSavingTrip, setIsSavingTrip] = useState(false);

  // Modals
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [isLogisticsModalOpen, setIsLogisticsModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assigningTransportationId, setAssigningTransportationId] = useState<string | null>(null);
  const [isDetectingZip, setIsDetectingZip] = useState(false);
  const [detectedZip, setDetectedZip] = useState('');

  const detectZipCode = async (locationName: string, address: string) => {
    if (!locationName && !address) return;
    setIsDetectingZip(true);
    try {
      const prompt = `Given the location name "${locationName}" and address "${address}" in Israel, what is the 7-digit zip code (Mikud)? Return ONLY the 7-digit number. If you are not sure, return "0000000".`;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      const zip = response.text.trim().match(/\d{7}/)?.[0] || '';
      if (zip) {
        setDetectedZip(zip);
      }
    } catch (e) {
      console.error('Error detecting zip:', e);
    } finally {
      setIsDetectingZip(false);
    }
  };
  const [editingLogistics, setEditingLogistics] = useState<any>(null);
  const [calculatedAge, setCalculatedAge] = useState<number | string>('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ coll: string, id: string } | null>(null);

  useEffect(() => {
    if (editingLogistics?.age) {
      setCalculatedAge(editingLogistics.age);
    } else {
      setCalculatedAge('');
    }
  }, [editingLogistics]);

  const selectedTrip = useMemo(() => trips.find(t => t.id === selectedTripId), [trips, selectedTripId]);
  const userRegistration = useMemo(() => {
    const userRegs = registrations.filter(r => r.tripId === selectedTripId && r.participantId === user?.id);
    if (userRegs.length === 0) return null;
    const priority: Record<string, number> = { 'Approved': 3, 'מאושר': 3, 'Pending': 2, 'ממתין': 2, 'Rejected': 1, 'נדחה': 1 };
    return [...userRegs].sort((a, b) => (priority[b.status] || 0) - (priority[a.status] || 0))[0];
  }, [registrations, selectedTripId, user]);

  const isApproved = useMemo(() => 
    userRole === 'admin' || userRegistration?.status === 'Approved' || userRegistration?.status === 'מאושר',
  [userRole, userRegistration]);

  // --- Local Storage Helpers ---
  const saveToLocal = async (key: string, data: any) => {
    try {
      await idb.set(key, data);
    } catch (error) {
      console.error('Error saving to IndexedDB:', error);
      // Fallback to localStorage for small data if needed, but here we want to avoid QuotaExceeded
    }
  };

  const getFromLocal = async (key: string) => {
    try {
      return await idb.get(key);
    } catch (error) {
      console.error('Error getting from IndexedDB:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const savedUser = await getFromLocal('currentUser');
      if (savedUser) {
        setUser(savedUser);
        setUserRole(savedUser.role);
      }
      
      // Load initial data from local storage or use defaults
      const initialTrips = await getFromLocal('trips') || [];
      if (initialTrips.length === 0) {
        const defaultTrips = [
          { id: '1', tripNumber: 'TRP-001', tripName: 'משלחת קיץ לאירופה', startDate: '2026-07-15', endDate: '2026-07-30', groupSize: 45, tripType: 'Adventure' },
          { id: '2', tripNumber: 'TRP-002', tripName: 'טיול שורשים פולין', startDate: '2025-10-10', endDate: '2025-10-20', groupSize: 30, tripType: 'Heritage' }
        ];
        setTrips(defaultTrips);
        await saveToLocal('trips', defaultTrips);
        initialTrips.push(...defaultTrips);
      } else {
        setTrips(initialTrips);
      }

      const initialParticipants = await getFromLocal('participants') || [];
      if (initialParticipants.length === 0) {
        const defaultParticipants = [
          { id: 'p1', firstName: 'ישראל', lastName: 'ישראלי', email: 'israel@example.com', phone: '050-1234567', birthday: '1990-05-05', age: 34 }
        ];
        setParticipants(defaultParticipants);
        await saveToLocal('participants', defaultParticipants);
        initialParticipants.push(...defaultParticipants);
      } else {
        setParticipants(initialParticipants);
      }

      const initialRegistrations = await getFromLocal('registrations') || [];
      if (initialRegistrations.length === 0 && initialTrips.length > 0 && initialParticipants.length > 0) {
        const defaultRegs = [
          { id: 'r1', tripId: '1', participantId: 'p1', registrationDate: '2024-01-01', status: 'Approved' }
        ];
        setRegistrations(defaultRegs);
        await saveToLocal('registrations', defaultRegs);
      } else {
        setRegistrations(initialRegistrations);
      }

      const firstTripId = initialTrips.length > 0 ? initialTrips[0].id : '';

      const initialSuppliers = await getFromLocal('suppliers') || [];
      const mdaExists = initialSuppliers.some((s: any) => s.companyName === 'מגן דוד אדום' && (!s.tripId || s.tripId === firstTripId));
      if (!mdaExists && firstTripId) {
        const mdaSupplier = { id: 'sup-mda', companyName: 'מגן דוד אדום', serviceType: 'Equipment', contactPhone: '101', supplierNumber: '101', tripId: firstTripId };
        const updatedSuppliers = [...initialSuppliers, mdaSupplier];
        setSuppliers(updatedSuppliers);
        await saveToLocal('suppliers', updatedSuppliers);
      } else {
        setSuppliers(initialSuppliers);
      }

      const initialEquipment = await getFromLocal('equipment') || [];
      const mdaBagExists = initialEquipment.some((e: any) => e.itemName.includes('מגן דוד אדום') && (!e.tripId || e.tripId === firstTripId));
      if (!mdaBagExists && firstTripId) {
        const mdaBag = { id: 'eq-mda-bag', itemName: 'תיק עזרה ראשונה (מגן דוד אדום)', totalInStock: 50, supplierId: 'מגן דוד אדום', tripId: firstTripId };
        const updatedEquipment = [...initialEquipment, mdaBag];
        setEquipment(updatedEquipment);
        await saveToLocal('equipment', updatedEquipment);
      } else {
        setEquipment(initialEquipment);
      }

      setLocations(await getFromLocal('locations') || []);
      setTransportation(await getFromLocal('transportation') || []);
      setTripEquipment(await getFromLocal('tripEquipment') || []);

      // Data patch for New York trip transportation
      const currentTrips = await getFromLocal('trips') || [];
      const currentTrans = await getFromLocal('transportation') || [];
      const nyTrip = currentTrips.find((t: any) => t.tripName?.includes('ניו יורק') || t.id === '4');
      if (nyTrip) {
        let changed = false;
        let updatedTrans = [...currentTrans];
        
        // Patch Plane
        updatedTrans = updatedTrans.map((t: any) => {
          if (t.tripId === nyTrip.id && t.vehicleType === 'מטוס' && t.departureDateTime?.includes('06:15')) {
            if (t.fromLocationId !== 'ניו יורק' || t.toLocationId !== 'נתבג') {
              changed = true;
              return { ...t, fromLocationId: 'ניו יורק', toLocationId: 'נתבג' };
            }
          }
          return t;
        });

        // Add Bus if missing
        const hasBus = updatedTrans.some((t: any) => t.tripId === nyTrip.id && t.vehicleType === 'אוטובוס');
        if (!hasBus) {
          changed = true;
          updatedTrans.push({
            id: `trans-bus-${nyTrip.id}`,
            tripId: nyTrip.id,
            vehicleType: 'אוטובוס',
            capacity: 50,
            departureDateTime: '2026-04-26T08:00:00',
            fromLocationId: 'נתבג',
            toLocationId: 'ירושלים',
            status: 'מאושר'
          });
        }

        if (changed) {
          setTransportation(updatedTrans);
          await idb.set('transportation', updatedTrans);
        }
      }

      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const populateImages = async () => {
      const tripsToUpdate = trips.filter(t => !t.imageUrl || t.imageUrl.includes('picsum.photos'));
      if (tripsToUpdate.length > 0) {
        const updatedTrips = [...trips];
        let changed = false;
        for (const trip of tripsToUpdate) {
          const imageUrl = await getTripImage(trip.tripName);
          const index = updatedTrips.findIndex(t => t.id === trip.id);
          if (index !== -1) {
            updatedTrips[index] = { ...updatedTrips[index], imageUrl };
            changed = true;
          }
        }
        if (changed) {
          setTrips(updatedTrips);
          await saveToLocal('trips', updatedTrips);
        }
      }
    };
    if (trips.length > 0) populateImages();
  }, [trips.length]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (password.length < 6) {
      setAuthError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    try {
      if (authMode === 'register') {
        const users = await getFromLocal('users') || [];
        if (users.find((u: any) => u.email === email)) {
          setAuthError('כתובת האימייל הזו כבר נמצאת בשימוש.');
          return;
        }
        const role = email === 'a.a.m.sharedgpt@gmail.com' ? 'admin' : 'tourist';
        const newUser = { id: Math.random().toString(36).substr(2, 9), email, name, role, password };
        users.push(newUser);
        await saveToLocal('users', users);
        
        const profile = { id: newUser.id, email, name, role };
        setUser(profile);
        setUserRole(role);
        setActiveTab('summary');
        await saveToLocal('currentUser', profile);
      } else {
        const users = await getFromLocal('users') || [];
        const isAdminMaster = email === 'a.a.m.sharedgpt@gmail.com' && password === '123456';
        const existingAdmin = users.find((u: any) => u.email === email);
        const foundUser = users.find((u: any) => u.email === email && u.password === password) || 
                         (isAdminMaster ? (existingAdmin || { id: 'admin-id', email, name: 'Admin', role: 'admin' }) : null);
        
        if (foundUser) {
          const profile = { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role };
          setUser(profile);
          setUserRole(foundUser.role);
          setActiveTab('summary');
          await saveToLocal('currentUser', profile);
        } else {
          setAuthError('פרטי ההתחברות אינם נכונים.');
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setAuthError('שגיאה בתהליך ההתחברות');
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setUserRole(null);
    setActiveTab('summary');
    await idb.del('currentUser');
  };

  const toggleRole = async () => {
    if (!user) return;
    const newRole = userRole === 'admin' ? 'tourist' : 'admin';
    const updatedUser = { ...user, role: newRole };
    setUser(updatedUser);
    setUserRole(newRole);
    setActiveTab('summary');
    await saveToLocal('currentUser', updatedUser);
    
    // Update in users list too
    const users = await getFromLocal('users') || [];
    const updatedUsers = users.map((u: any) => u.id === user.id ? { ...u, role: newRole } : u);
    await saveToLocal('users', updatedUsers);
  };

  // --- AI Helpers ---
  const getTripImage = async (tripName: string) => {
    if (isAiImageDisabled) {
      return `https://picsum.photos/seed/${tripName}/1200/600`;
    }
    try {
      // Add a timeout to the AI call
      const aiPromise = ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A high-quality, professional travel photography style image representing the essence of a trip to "${tripName}". Cinematic lighting, wide angle, 4k resolution, atmospheric.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AI Generation Timeout')), 10000)
      );

      const response = await Promise.race([aiPromise, timeoutPromise]) as any;

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
      
      // Fallback if no image part found
      return `https://picsum.photos/seed/${tripName}/1200/600`;
    } catch (error: any) {
      // Check for quota exceeded error (429)
      const errorStr = JSON.stringify(error);
      if (errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('429')) {
        setIsAiImageDisabled(true);
        console.warn("Gemini API quota exceeded. Falling back to placeholder images for this session.");
      } else {
        console.error("AI Image generation error:", error);
      }
      return `https://picsum.photos/seed/${tripName}/1200/600`;
    }
  };

  const handleAddTrip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSavingTrip) return;
    
    console.log('Starting handleAddTrip...');
    setIsSavingTrip(true);
    const formData = new FormData(e.currentTarget);
    const tripData = {
      tripNumber: formData.get('tripNumber') as string,
      tripName: formData.get('tripName') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      groupSize: Number(formData.get('groupSize')),
      tripType: formData.get('tripType') as string
    };
    console.log('Trip data collected:', tripData);

    try {
      let updatedTrips;
      if (editingTrip) {
        const imageUrl = editingTrip.tripName !== tripData.tripName ? await getTripImage(tripData.tripName) : editingTrip.imageUrl;
        updatedTrips = trips.map(t => t.id === editingTrip.id ? { ...t, ...tripData, imageUrl } : t);
      } else {
        const imageUrl = await getTripImage(tripData.tripName);
        const newTrip = { id: Math.random().toString(36).substr(2, 9), ...tripData, imageUrl };
        updatedTrips = [...trips, newTrip];
        setSelectedTripId(newTrip.id);
      }
      setTrips(updatedTrips);
      await saveToLocal('trips', updatedTrips);
      setIsTripModalOpen(false);
      setEditingTrip(null);
    } catch (e) {
      console.error('Error saving trip:', e);
      alert('שגיאה בשמירת המשלחת. אנא נסה שוב.');
    } finally {
      setIsSavingTrip(false);
    }
  };

  const handleJoinRequest = async () => {
    if (!user || !selectedTripId || !selectedTrip) return;
    
    // Check capacity
    const approvedCount = registrations.filter(r => r.tripId === selectedTripId && (r.status === 'Approved' || r.status === 'מאושר')).length;
    if (approvedCount >= selectedTrip.groupSize) {
      alert('מצטערים, המשלחת כבר מלאה.');
      return;
    }

    // Check if already registered
    const alreadyRegistered = registrations.find(r => r.tripId === selectedTripId && r.participantId === user.id);
    if (alreadyRegistered) return;

    // Create participant record if it doesn't exist
    const existingParticipant = participants.find(p => p.id === user.id);
    if (!existingParticipant) {
      const names = user.name.split(' ');
      const newParticipant: Participant = {
        id: user.id,
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        email: user.email,
        phone: '',
        age: 0,
        birthday: ''
      };
      const updatedParticipants = [...participants, newParticipant];
      setParticipants(updatedParticipants);
      await saveToLocal('participants', updatedParticipants);
    }

    const newRegistration: Registration = {
      id: Math.random().toString(36).substr(2, 9),
      tripId: selectedTripId,
      participantId: user.id,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    const updatedRegistrations = [...registrations, newRegistration];
    setRegistrations(updatedRegistrations);
    await saveToLocal('registrations', updatedRegistrations);
  };

  const handleApproveRegistration = async (regId: string, status: string) => {
    if ((status === 'Approved' || status === 'מאושר') && selectedTrip) {
      const otherApprovedCount = registrations.filter(r => 
        r.tripId === selectedTripId && 
        r.id !== regId && 
        (r.status === 'Approved' || r.status === 'מאושר')
      ).length;
      
      if (otherApprovedCount >= selectedTrip.groupSize) {
        alert('לא ניתן לאשר משתתף נוסף, המשלחת הגיעה למכסה המקסימלית.');
        return;
      }
    }
    const updatedRegistrations = registrations.map(r => 
      r.id === regId ? { ...r, status } : r
    );
    setRegistrations(updatedRegistrations);
    await saveToLocal('registrations', updatedRegistrations);
  };

  const handleAssignParticipants = async (transportationId: string, participantIds: string[]) => {
    const updatedRegistrations = registrations.map(r => {
      if (r.tripId === selectedTripId) {
        if (participantIds.includes(r.participantId)) {
          return { ...r, transportationId };
        } else if (r.transportationId === transportationId) {
          // If it was assigned to this bus but not in the new list, remove the assignment
          const { transportationId: _, ...rest } = r;
          return rest as Registration;
        }
      }
      return r;
    });
    setRegistrations(updatedRegistrations);
    await saveToLocal('registrations', updatedRegistrations);
    setIsAssignModalOpen(false);
    setAssigningTransportationId(null);
  };

  const handleDownloadSummary = () => {
    if (!selectedTrip) return;

    let content = `סיכום משלחת: ${selectedTrip.tripName} (מספר: ${selectedTrip.tripNumber})\n`;
    content += `תאריכים: ${new Date(selectedTrip.startDate).toLocaleDateString('he-IL')} - ${new Date(selectedTrip.endDate).toLocaleDateString('he-IL')}\n`;
    content += `סוג: ${selectedTrip.tripType}\n`;
    content += `גודל קבוצה: ${selectedTrip.groupSize}\n`;
    content += `\n-----------------------------------\n\n`;

    content += `תחבורה:\n`;
    filteredData.transportation.forEach(t => {
      const fromLoc = locations.find(l => l.id === t.fromLocationId)?.locationName || t.fromLocationId || 'לא ידוע';
      const toLoc = locations.find(l => l.id === t.toLocationId)?.locationName || t.toLocationId || 'לא ידוע';
      const fromAddr = t.fromAddress ? ` (${t.fromAddress})` : '';
      const toAddr = t.toAddress ? ` (${t.toAddress})` : '';
      const time = t.departureTime || (t.departureDateTime ? new Date(t.departureDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }) : '');
      content += `- ${t.vehicleType}: ${fromLoc}${fromAddr} -> ${toLoc}${toAddr} (${t.capacity} מושבים) | שעה: ${time} | סטטוס: ${t.status || 'ממתין'}\n`;
      const busParticipants = registrations
        .filter(r => r.transportationId === t.id)
        .map(r => {
          const p = participants.find(part => part.id === r.participantId);
          return p ? `${p.firstName} ${p.lastName}` : null;
        })
        .filter(Boolean);
      if (busParticipants.length > 0) {
        content += `  משתתפים: ${busParticipants.join(', ')}\n`;
      }
    });

    content += `\nציוד:\n`;
    filteredData.tripEquipment.forEach(e => {
      const item = equipment.find(ge => ge.id === e.equipmentId);
      content += `- ${item?.itemName || 'ציוד לא ידוע'}: ${e.quantityAllocated} יחידות | סטטוס: ${e.status || 'ממתין'}\n`;
    });

    content += `\nמשתתפים רשומים:\n`;
    filteredData.registrations.forEach(r => {
      const p = participants.find(part => part.id === r.participantId);
      if (p) {
        content += `- ${p.firstName} ${p.lastName} (${p.email}) | סטטוס: ${r.status}\n`;
      }
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `summary_${selectedTrip.tripName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const reportData = useMemo(() => {
    if (!selectedReportId) return null;
    const today = new Date();

    switch (selectedReportId) {
      case 'summer2026': {
        const summerTrips = trips.filter(t => {
          const start = new Date(t.startDate);
          return start.getFullYear() === 2026 && [5, 6, 7].includes(start.getMonth());
        });
        const tripIds = summerTrips.map(t => t.id);
        const relevantRegs = registrations.filter(r => tripIds.includes(r.tripId));
        return relevantRegs.map(r => {
          const p = participants.find(part => part.id === r.participantId);
          const t = trips.find(trip => trip.id === r.tripId);
          return {
            'מזהה משתתף': p?.id,
            'שם פרטי': p?.firstName,
            'שם משפחה': p?.lastName,
            'אימייל': p?.email,
            'שם המשלחת': t?.tripName,
            'תאריך התחלה': t?.startDate ? new Date(t.startDate).toLocaleDateString('he-IL') : ''
          };
        });
      }
      case 'highEquipmentTrips': {
        return trips.map(t => {
          const total = tripEquipment
            .filter(te => te.tripId === t.id)
            .reduce((sum, te) => sum + (te.quantityAllocated || 0), 0);
          return {
            'שם המשלחת': t.tripName,
            'שנה': new Date(t.startDate).getFullYear(),
            'סה"כ ציוד חולק': total
          };
        }).filter(item => item['סה"כ ציוד חולק'] > 5);
      }
      case 'multiServiceSuppliers': {
        return suppliers.filter(s => {
          const hasTransport = transportation.some(t => t.supplierId === s.id);
          const hasEquipment = equipment.some(e => e.supplierId === s.id) || tripEquipment.some(te => te.supplierId === s.id);
          return hasTransport && hasEquipment;
        }).map(s => ({ 'שם החברה': s.companyName, 'טלפון': s.contactPhone, 'סוג שירות עיקרי': s.serviceType }));
      }
      case 'mostPopularTrip': {
        const counts = registrations.reduce((acc: any, curr) => {
          acc[curr.tripId] = (acc[curr.tripId] || 0) + 1;
          return acc;
        }, {});
        const maxTripId = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, '');
        const t = trips.find(trip => trip.id === maxTripId);
        if (!t) return [];
        return [{ 'שם המשלחת': t.tripName, 'סוג': t.tripType, 'תאריך התחלה': new Date(t.startDate).toLocaleDateString('he-IL'), 'מספר רשומים': counts[maxTripId] }];
      }
      case 'adventureItinerary': {
        const adventureTrips = trips.filter(t => t.tripType === 'Adventure' || t.tripType === 'אתגרי');
        return adventureTrips.flatMap(t => {
          const tripLocs = locations.filter(l => l.tripId === t.id).sort((a, b) => (a.locationOrder || 0) - (b.locationOrder || 0));
          return tripLocs.map(l => ({ 'משלחת': t.tripName, 'שם מיקום': l.locationName, 'אזור': l.region, 'כתובת': l.address, 'סדר': l.locationOrder || '-', 'תאריך משלחת': new Date(t.startDate).toLocaleDateString('he-IL') }));
        });
      }
      case 'adultsUnreturned': {
        return participants.filter(p => {
          const birthday = new Date(p.birthday);
          const age = today.getFullYear() - birthday.getFullYear();
          if (age < 18) return false;
          const userRegs = registrations.filter(r => r.participantId === p.id);
          const userTripIds = userRegs.map(r => r.tripId);
          return tripEquipment.some(te => {
            const t = trips.find(trip => trip.id === te.tripId);
            return userTripIds.includes(te.tripId) && (!te.returnDate || new Date(te.returnDate) > today) && t && new Date(t.endDate) < today;
          });
        }).flatMap(p => {
          return tripEquipment.filter(te => {
            const userRegs = registrations.filter(r => r.participantId === p.id);
            const userTripIds = userRegs.map(r => r.tripId);
            const t = trips.find(trip => trip.id === te.tripId);
            return userTripIds.includes(te.tripId) && (!te.returnDate || new Date(te.returnDate) > today) && t && new Date(t.endDate) < today;
          }).map(te => {
            const t = trips.find(trip => trip.id === te.tripId);
            const item = equipment.find(ge => ge.id === te.equipmentId);
            return { 'שם': `${p.firstName} ${p.lastName}`, 'טלפון': p.phone, 'משלחת': t?.tripName, 'פריט': item?.itemName, 'תאריך יציאה': te.checkoutDate ? new Date(te.checkoutDate).toLocaleDateString('he-IL') : '-' };
          });
        });
      }
      case 'monthlySummary': {
        const stats: any = {};
        trips.forEach(t => {
          const date = new Date(t.startDate);
          const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          if (!stats[key]) stats[key] = { year: date.getFullYear(), month: date.getMonth() + 1, count: 0, totalSize: 0 };
          stats[key].count += 1;
          stats[key].totalSize += (t.groupSize || 0);
        });
        return Object.values(stats).sort((a: any, b: any) => b.year - a.year || b.month - a.month).map((s: any) => ({
          'שנה': s.year, 'חודש': s.month, 'מספר משלחות': s.count, 'גודל קבוצה ממוצע': (s.totalSize / s.count).toFixed(2)
        }));
      }
      case 'popularLocations': {
        const counts = locations.reduce((acc: any, curr) => {
          if (!curr.locationName) return acc;
          acc[curr.locationName] = (acc[curr.locationName] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]).slice(0, 3).map(([name, count]) => {
          const loc = locations.find(l => l.locationName === name);
          const tripIds = locations.filter(l => l.locationName === name).map(l => l.id);
          const uniqueParticipants = registrations.filter(r => tripIds.includes(r.tripId)).length;
          return { 'שם המיקום': name, 'אזור': loc?.region, 'מספר משלחות שמבקרות': count, 'סה"כ משתתפים ייחודיים': uniqueParticipants };
        });
      }
      default: return [];
    }
  }, [selectedReportId, trips, registrations, participants, tripEquipment, equipment, suppliers, transportation, locations]);

  useEffect(() => {
    if (selectedReportId) {
      setTimeout(() => {
        document.getElementById('report-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedReportId]);

  const reportSql = useMemo(() => {
    if (!selectedReportId) return null;
    const queries: Record<string, string> = {
      summer2026: `SELECT P.ParticipantID, P.FirstName, P.LastName, P.Email, T.TripName, 
       EXTRACT(DAY FROM T.StartDate) AS StartDay, 
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth, 
       EXTRACT(YEAR FROM T.StartDate) AS StartYear
FROM PARTICIPANT P
JOIN REGISTERS_TO R ON P.ParticipantID = R.ParticipantID
JOIN TRIP T ON R.TripID = T.TripID
WHERE EXTRACT(YEAR FROM T.StartDate) = 2026 
  AND EXTRACT(MONTH FROM T.StartDate) IN (6, 7, 8)
ORDER BY T.StartDate, P.LastName;`,
      highEquipmentTrips: `SELECT T.TripName, 
       EXTRACT(YEAR FROM T.StartDate) AS TripYear, 
       SUM(TE.QuantityAllocated) AS TotalEquipment
FROM TRIP T
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
GROUP BY T.TripID, T.TripName, EXTRACT(YEAR FROM T.StartDate)
HAVING SUM(TE.QuantityAllocated) > 5
ORDER BY TotalEquipment DESC;`,
      multiServiceSuppliers: `SELECT S.SupplierID, S.Company_Name, S.ContactPhone, S.Service_Type
FROM SUPPLIER S
WHERE EXISTS (
    SELECT 1 FROM TRANSPORTATION TR WHERE TR.SupplierID = S.SupplierID
)
AND EXISTS (
    SELECT 1 FROM EQUIPMENT EQ WHERE EQ.SupplierID = S.SupplierID
);`,
      mostPopularTrip: `SELECT T.TripName, T.Trip_Type, 
       EXTRACT(DAY FROM T.StartDate) AS StartDay,
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth,
       EXTRACT(YEAR FROM T.StartDate) AS StartYear,
       COUNT(R.ParticipantID) AS NumParticipants
FROM TRIP T
JOIN REGISTERS_TO R ON T.TripID = R.TripID
GROUP BY T.TripID, T.TripName, T.Trip_Type, T.StartDate
ORDER BY NumParticipants DESC
LIMIT 1;`,
      adventureItinerary: `SELECT T.TripName, L.LocationName, L.Region, L.Address, LT.Location_order,
       EXTRACT(DAY FROM T.StartDate) AS StartDay,
       EXTRACT(MONTH FROM T.StartDate) AS StartMonth,
       EXTRACT(YEAR FROM T.StartDate) AS StartYear
FROM TRIP T
JOIN Location_Trip LT ON T.TripID = LT.TripID
JOIN LOCATION L ON LT.LocationID = L.LocationID
WHERE T.Trip_Type = 'Adventure'
ORDER BY T.TripID, LT.Location_order;`,
      adultsUnreturned: `SELECT P.FirstName, P.LastName, P.Phone, T.TripName, EQ.ItemName, TE.Checkout_Date
FROM PARTICIPANT P
JOIN REGISTERS_TO R ON P.ParticipantID = R.ParticipantID
JOIN TRIP T ON R.TripID = T.TripID
JOIN TRIP_EQUIPMENT TE ON T.TripID = TE.TripID
JOIN EQUIPMENT EQ ON TE.EquipmentID = EQ.EquipmentID
WHERE EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.birthday) >= 18
  AND TE.Return_Date IS NULL
  AND T.EndDate < CURRENT_DATE;`,
      monthlySummary: `SELECT EXTRACT(YEAR FROM StartDate) AS TripYear,
       EXTRACT(MONTH FROM StartDate) AS TripMonth,
       COUNT(TripID) AS NumberOfTrips,
       ROUND(AVG(GroupSize), 2) AS AverageGroupSize
FROM TRIP
GROUP BY EXTRACT(YEAR FROM StartDate), EXTRACT(MONTH FROM StartDate)
ORDER BY TripYear DESC, TripMonth DESC;`,
      popularLocations: `SELECT L.LocationName, L.Region, 
       COUNT(DISTINCT LT.TripID) AS TripsVisiting,
       COUNT(DISTINCT R.ParticipantID) AS TotalParticipants
FROM LOCATION L
JOIN Location_Trip LT ON L.LocationID = LT.LocationID
JOIN REGISTERS_TO R ON LT.TripID = R.TripID
GROUP BY L.LocationID, L.LocationName, L.Region
ORDER BY TripsVisiting DESC, TotalParticipants DESC
LIMIT 3;`
    };
    return queries[selectedReportId] || null;
  }, [selectedReportId]);

  const handleAddLogistics = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = { tripId: selectedTripId };
    formData.forEach((value, key) => data[key] = value);
    
    try {
      // 1. Handle Supplier Auto-creation
      if (data.supplierId && typeof data.supplierId === 'string') {
        const sName = data.supplierId.trim();
        if (sName) {
          const existingSupplier = suppliers.find(s => 
            (s.tripId === selectedTripId || !s.tripId) && (
              s.id === sName || 
              s.companyName.trim().toLowerCase() === sName.toLowerCase()
            )
          );
          if (!existingSupplier) {
            const newId = Math.random().toString(36).substr(2, 9);
            const newSupplier = {
              id: newId,
              companyName: sName,
              serviceType: activeTab === 'transportation' ? 'Transportation' : (activeTab === 'locations' ? 'Venue' : 'Equipment'),
              contactPhone: 'לא הוזן',
              supplierNumber: 'חדש',
              tripId: selectedTripId
            };
            const updatedSuppliers = [...suppliers, newSupplier];
            setSuppliers(updatedSuppliers);
            await saveToLocal('suppliers', updatedSuppliers);
            data.supplierId = newId;
          } else {
            data.supplierId = existingSupplier.id;
          }
        }
      }

      // 2. Handle Equipment Auto-creation
      if (activeTab === 'equipment' && data.equipmentId && typeof data.equipmentId === 'string') {
        const eName = data.equipmentId.trim();
        if (eName) {
          const existingEquipment = equipment.find(e => 
            (e.tripId === selectedTripId || !e.tripId) && (
              e.id === eName || 
              e.itemName.trim().toLowerCase() === eName.toLowerCase()
            )
          );
          if (!existingEquipment) {
            const newId = Math.random().toString(36).substr(2, 9);
            const newInventoryItem = {
              id: newId,
              itemName: eName,
              totalInStock: parseInt(data.quantityAllocated) || 1,
              supplierId: data.supplierId || 'לא ידוע',
              tripId: selectedTripId
            };
            const updatedEquipment = [...equipment, newInventoryItem];
            setEquipment(updatedEquipment);
            await saveToLocal('equipment', updatedEquipment);
            data.equipmentId = newId;
          } else {
            data.equipmentId = existingEquipment.id;
          }
        }
      }

      let collName = '';
      let state: any[] = [];
      let setState: any = null;

      if (activeTab === 'transportation') { collName = 'transportation'; state = transportation; setState = setTransportation; }
      else if (activeTab === 'equipment') { collName = 'tripEquipment'; state = tripEquipment; setState = setTripEquipment; }
      else if (activeTab === 'locations') { collName = 'locations'; state = locations; setState = setLocations; }
      else if (activeTab === 'participants') { collName = 'participants'; state = participants; setState = setParticipants; }
      else if (activeTab === 'registrations') { collName = 'registrations'; state = registrations; setState = setRegistrations; }
      else if (activeTab === 'suppliers') { collName = 'suppliers'; state = suppliers; setState = setSuppliers; }
      else if (activeTab === 'globalEquipment') { collName = 'equipment'; state = equipment; setState = setEquipment; }

      if (collName && setState) {
        let updatedData;
        if (editingLogistics) {
          updatedData = state.map((item: any) => item.id === editingLogistics.id ? { ...item, ...data } : item);
        } else {
          const newItem = { id: Math.random().toString(36).substr(2, 9), ...data };
          updatedData = [...state, newItem];
        }
        setState(updatedData);
        await saveToLocal(collName, updatedData);
      }
      setIsLogisticsModalOpen(false);
      setEditingLogistics(null);
    } catch (e) {
      console.error('Error saving logistics:', e);
    }
  };

  const addComment = async (type: string, id: string, text: string) => {
    if (!text.trim() || !user) return;
    const collName = type === 'equipment' ? 'tripEquipment' : 
                     type === 'globalEquipment' ? 'equipment' : type;
    let state: any[] = [];
    let setState: any = null;

    if (collName === 'transportation') { state = transportation; setState = setTransportation; }
    else if (collName === 'tripEquipment') { state = tripEquipment; setState = setTripEquipment; }
    else if (collName === 'locations') { state = locations; setState = setLocations; }
    else if (collName === 'participants') { state = participants; setState = setParticipants; }
    else if (collName === 'suppliers') { state = suppliers; setState = setSuppliers; }
    else if (collName === 'equipment') { state = equipment; setState = setEquipment; }
    else if (collName === 'registrations') { state = registrations; setState = setRegistrations; }

    if (setState) {
      const updatedData = state.map((item: any) => {
        if (item.id === id) {
          const comments = item.comments || [];
          return {
            ...item,
            comments: [...comments, {
              id: Math.random().toString(36).substr(2, 9),
              text,
              author: user.name,
              createdAt: new Date().toISOString()
            }]
          };
        }
        return item;
      });
      setState(updatedData);
      await saveToLocal(collName, updatedData);
    }
  };

  const acknowledge = async (type: string, id: string) => {
    if (!user) return;
    const collName = type === 'equipment' ? 'tripEquipment' : 
                     type === 'globalEquipment' ? 'equipment' : type;
    let state: any[] = [];
    let setState: any = null;

    if (collName === 'transportation') { state = transportation; setState = setTransportation; }
    else if (collName === 'tripEquipment') { state = tripEquipment; setState = setTripEquipment; }
    else if (collName === 'locations') { state = locations; setState = setLocations; }
    else if (collName === 'participants') { state = participants; setState = setParticipants; }
    else if (collName === 'suppliers') { state = suppliers; setState = setSuppliers; }
    else if (collName === 'equipment') { state = equipment; setState = setEquipment; }
    else if (collName === 'registrations') { state = registrations; setState = setRegistrations; }

    if (setState) {
      const updatedData = state.map((item: any) => {
        if (item.id === id) {
          const acknowledgedBy = item.acknowledgedBy || [];
          if (!acknowledgedBy.includes(user.id)) {
            return { ...item, acknowledgedBy: [...acknowledgedBy, user.id] };
          }
        }
        return item;
      });
      setState(updatedData);
      await saveToLocal(collName, updatedData);
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    setDeleteConfirmation({ coll, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation) return;
    const { coll, id } = deleteConfirmation;
    
    try {
      let state: any[] = [];
      let setState: any = null;
      let storageKey = coll;

      if (coll === 'trips') { state = trips; setState = setTrips; }
      else if (coll === 'transportation') { state = transportation; setState = setTransportation; }
      else if (coll === 'tripEquipment') { state = tripEquipment; setState = setTripEquipment; }
      else if (coll === 'locations') { state = locations; setState = setLocations; }
      else if (coll === 'participants') { state = participants; setState = setParticipants; }
      else if (coll === 'registrations') { state = registrations; setState = setRegistrations; }
      else if (coll === 'suppliers') { state = suppliers; setState = setSuppliers; }
      else if (coll === 'equipment') { state = equipment; setState = setEquipment; }

      if (setState) {
        const updatedData = state.filter((item: any) => item.id !== id);
        setState(updatedData);
        await saveToLocal(storageKey, updatedData);
        if (coll === 'trips' && id === selectedTripId) {
          setSelectedTripId(updatedData.length > 0 ? updatedData[0].id : '');
        }
      }
      setDeleteConfirmation(null);
    } catch (e) {
      console.error('Error deleting:', e);
      setDeleteConfirmation(null);
    }
  };

  const filteredData = {
    transportation: transportation.filter(t => {
      const isTripMatch = t.tripId === selectedTripId;
      const isSearchMatch = t.vehicleType.toLowerCase().includes(searchQuery.toLowerCase());
      if (!isTripMatch || !isSearchMatch) return false;
      
      if (userRole === 'tourist' && isApproved) {
        return userRegistration?.transportationId === t.id;
      }
      return true;
    }).filter((t, index, self) => {
      if (userRole === 'tourist' && !isApproved) {
        return index === self.findIndex(s => 
          s.departureDateTime === t.departureDateTime && 
          s.fromLocationId === t.fromLocationId && 
          s.toLocationId === t.toLocationId
        );
      }
      return true;
    }),
    locations: locations.filter(l => l.tripId === selectedTripId && l.locationName.toLowerCase().includes(searchQuery.toLowerCase())),
    participants: participants.filter(p => 
      registrations.some(r => r.tripId === selectedTripId && r.participantId === p.id && (r.status === 'Approved' || r.status === 'מאושר')) &&
      (p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || p.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    registrations: registrations.filter(r => r.tripId === selectedTripId).reduce((acc: any[], current) => {
      const existing = acc.find(item => item.participantId === current.participantId);
      if (!existing) {
        acc.push(current);
      } else if (current.status === 'Approved' || current.status === 'מאושר') {
        const index = acc.indexOf(existing);
        acc[index] = current;
      }
      return acc;
    }, []),
    suppliers: suppliers.filter(s => {
      // Show if explicitly associated with this trip
      const isTripSupplier = s.tripId === selectedTripId;
      
      // Also show if it's a "global" supplier (no tripId) but is referenced by this trip's logistics
      const isReferencedByTrip = !s.tripId && (
        transportation.some(t => t.tripId === selectedTripId && (t.supplierId === s.id || t.supplierId === s.companyName)) ||
        tripEquipment.some(te => te.tripId === selectedTripId && (te.supplierId === s.id || te.supplierId === s.companyName)) ||
        locations.some(l => l.tripId === selectedTripId && (l.supplierId === s.id || l.supplierId === s.companyName))
      );

      if (!isTripSupplier && !isReferencedByTrip) return false;

      const isNameMatch = s.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      const providesGlobalEquipment = equipment.some(e => 
        e.supplierId && (
          e.supplierId === s.id || 
          e.supplierId.trim().toLowerCase() === s.companyName.trim().toLowerCase()
        ) && e.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const providesTripEquipment = tripEquipment.some(te => {
        const isSupplierMatch = te.supplierId && (
          te.supplierId === s.id || 
          te.supplierId.trim().toLowerCase() === s.companyName.trim().toLowerCase()
        );
        const ge = equipment.find(e => e.id === te.equipmentId);
        const itemName = ge ? ge.itemName : te.equipmentId;
        return isSupplierMatch && (itemName || '').toLowerCase().includes(searchQuery.toLowerCase());
      });
      return isNameMatch || providesGlobalEquipment || providesTripEquipment;
    }),
    globalEquipment: equipment.filter(e => {
      // Show if explicitly associated with this trip
      const isTripEquipment = e.tripId === selectedTripId;
      
      // Also show if it's a "global" item (no tripId) but is referenced by this trip's allocations
      const isReferencedByTrip = !e.tripId && tripEquipment.some(te => te.tripId === selectedTripId && (te.equipmentId === e.id || te.equipmentId === e.itemName));

      if (!isTripEquipment && !isReferencedByTrip) return false;
      
      const isNameMatch = e.itemName.toLowerCase().includes(searchQuery.toLowerCase());
      const supplier = suppliers.find(s => s.id === e.supplierId);
      const isSupplierMatch = (supplier?.companyName || e.supplierId || '').toLowerCase().includes(searchQuery.toLowerCase());
      return isNameMatch || isSupplierMatch;
    }),
    tripEquipment: tripEquipment.filter(te => {
      const isTripMatch = te.tripId === selectedTripId;
      const item = equipment.find(ge => ge.id === te.equipmentId);
      const isNameMatch = (item?.itemName || te.equipmentId || '').toLowerCase().includes(searchQuery.toLowerCase());
      const supplier = suppliers.find(s => s.id === te.supplierId);
      const isSupplierMatch = (supplier?.companyName || te.supplierId || '').toLowerCase().includes(searchQuery.toLowerCase());
      const globalSupplier = suppliers.find(s => s.id === item?.supplierId);
      const isGlobalSupplierMatch = (globalSupplier?.companyName || item?.supplierId || '').toLowerCase().includes(searchQuery.toLowerCase());
      return isTripMatch && (isNameMatch || isSupplierMatch || isGlobalSupplierMatch);
    })
  };

  const scheduleItems = useMemo(() => {
    const items: any[] = [];
    
    filteredData.transportation.forEach(t => {
      // For tourists, only show transportation in schedule if approved
      if (userRole === 'tourist' && !isApproved) return;

      if (t.departureDateTime) {
        items.push({
          id: `${t.id}-departure`,
          type: 'transportation',
          dateTime: t.departureDateTime,
          title: isApproved 
            ? `יציאת ${t.vehicleType} בשעה ${new Date(t.departureDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`
            : `יציאה בשעה ${new Date(t.departureDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`,
          description: `${locations.find(l => l.id === t.fromLocationId)?.locationName || t.fromLocationId || 'לא ידוע'} -> ${locations.find(l => l.id === t.toLocationId)?.locationName || t.toLocationId || 'לא ידוע'}`,
          icon: isApproved ? (t.vehicleType === 'מטוס' ? Plane : Bus) : Clock,
          status: t.status
        });
      }
      if (t.arrivalDateTime) {
        items.push({
          id: `${t.id}-arrival`,
          type: 'transportation',
          dateTime: t.arrivalDateTime,
          title: isApproved
            ? `חזרת ${t.vehicleType} / הגעה בשעה ${new Date(t.arrivalDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`
            : `חזרה / הגעה בשעה ${new Date(t.arrivalDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}`,
          description: `הגעה ל${locations.find(l => l.id === t.fromLocationId)?.locationName || t.fromLocationId || 'נקודת המוצא'}`,
          icon: isApproved ? (t.vehicleType === 'מטוס' ? Plane : Bus) : Clock,
          status: t.status
        });
      }
    });

    filteredData.locations.forEach(l => {
      if (l.visitDateTime) {
        items.push({
          id: l.id,
          type: 'location',
          dateTime: l.visitDateTime,
          title: `ביקור ב${l.locationName}`,
          description: l.address,
          icon: MapPin,
          status: 'מאושר'
        });
      }
    });

    filteredData.tripEquipment.forEach(e => {
      const ge = equipment.find(item => item.id === e.equipmentId);
      const itemName = ge ? ge.itemName : e.equipmentId;
      if (e.checkoutDate) {
        items.push({
          id: `${e.id}-checkout`,
          type: 'equipment',
          dateTime: e.checkoutDate,
          title: `לקיחת ${itemName}`,
          description: `כמות: ${e.quantityAllocated}`,
          icon: Package,
          status: e.status
        });
      }
      if (e.returnDate) {
        items.push({
          id: `${e.id}-return`,
          type: 'equipment',
          dateTime: e.returnDate,
          title: `החזרת ${itemName}`,
          description: `כמות: ${e.quantityAllocated}`,
          icon: Package,
          status: e.status
        });
      }
    });

    return items.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  }, [filteredData, locations, equipment]);

  const readinessScore = useMemo(() => {
    const items = [
      ...transportation.filter(t => t.tripId === selectedTripId),
      ...tripEquipment.filter(e => e.tripId === selectedTripId)
    ];
    if (items.length === 0) return 0;
    const ready = items.filter(i => (i as any).status === 'Confirmed' || (i as any).status === 'Ready' || (i as any).status === 'Booked' || (i as any).status === 'מאושר' || (i as any).status === 'מוכן' || (i as any).status === 'הוזמן').length;
    return Math.round((ready / items.length) * 100);
  }, [selectedTripId, transportation, tripEquipment]);

  const isFull = useMemo(() => {
    if (!selectedTrip) return false;
    const approvedCount = registrations.filter(r => r.tripId === selectedTripId && (r.status === 'Approved' || r.status === 'מאושר')).length;
    return approvedCount >= selectedTrip.groupSize;
  }, [registrations, selectedTripId, selectedTrip]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-sand-950/40 backdrop-blur-[2px]" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md glass-dark rounded-[2rem] p-8 text-white shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-olive-500/20 text-olive-400 mb-4">
              <MapPin size={32} />
            </div>
            <h1 className="text-4xl font-bold serif mb-2">TripLogix</h1>
            <p className="text-sand-200/80">המסע שלך מתחיל כאן.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-sand-400 mr-1">שם מלא</label>
                <Input name="name" type="text" placeholder="ישראל ישראלי" required className="bg-white/10 border-white/10 text-white placeholder:text-sand-500 text-right" />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-sand-400 mr-1">אימייל</label>
              <Input name="email" type="email" placeholder="name@company.com" required className="bg-white/10 border-white/10 text-white placeholder:text-sand-500 text-right" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-sand-400 mr-1">סיסמה</label>
              <Input name="password" type="password" placeholder="••••••••" required className="bg-white/10 border-white/10 text-white placeholder:text-sand-500 text-right" />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                {authError}
              </div>
            )}

            <Button type="submit" className="w-full py-4 text-base mt-2">
              {authMode === 'login' ? 'התחברות' : 'הרשמה'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sand-400 text-sm mb-2">
              {authMode === 'login' ? 'אין לך חשבון?' : 'כבר יש לך חשבון?'}
            </p>
            <button 
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setAuthError('');
              }}
              className="text-olive-400 font-bold hover:text-olive-300 transition-colors"
            >
              {authMode === 'login' ? 'צור חשבון חדש' : 'חזרה להתחברות'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-sand-50 overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <aside className="w-72 h-full flex-shrink-0 glass-dark text-white flex flex-col z-20 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-olive-500/20 text-olive-400">
              <MapPin size={24} />
            </div>
            <h1 className="text-2xl font-bold serif tracking-tight">TripLogix</h1>
          </div>

          <div className="space-y-4">
            {selectedTrip?.imageUrl && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-32 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
              >
                <img 
                  src={selectedTrip.imageUrl} 
                  alt={selectedTrip.tripName} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand-300 ml-1">משלחת נוכחית</label>
              <div className="relative">
                <select 
                  value={selectedTripId}
                  onChange={(e) => setSelectedTripId(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-olive-500/50 transition-all cursor-pointer text-right pr-4 pl-10 text-white"
                >
                  <option value="" disabled className="bg-sand-950">בחר טיול</option>
                  {trips.map(trip => (
                    <option key={trip.id} value={trip.id} className="bg-sand-950">
                      {trip.tripNumber ? `${trip.tripNumber} - ${trip.tripName}` : trip.tripName}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-300 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto min-h-0">
            {[
              { id: 'summary', icon: LayoutDashboard, label: 'סיכום משלחת' },
              { id: 'schedule', icon: Calendar, label: 'לו"ז משלחת' },
              { id: 'queries', icon: Database, label: 'דוחות ושאילתות', adminOnly: true },
              { id: 'transportation', icon: Bus, label: 'תחבורה', touristOnlyIfApproved: true },
              { id: 'locations', icon: Map, label: 'מיקומים' },
              { id: 'equipment', icon: Package, label: 'ציוד למשלחת', touristOnlyIfApproved: true },
              { id: 'participants', icon: Users, label: 'משתתפים', adminOnly: true },
              { id: 'registrations', icon: UserPlus, label: 'רישומים', adminOnly: true },
              { id: 'suppliers', icon: Building2, label: 'ספקים', adminOnly: true },
              { id: 'globalEquipment', icon: Package, label: 'מלאי ציוד', adminOnly: true }
            ].filter(item => {
              if (item.adminOnly && userRole !== 'admin') return false;
              if (item.touristOnlyIfApproved && userRole === 'tourist' && !isApproved) return false;
              return true;
            }).map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSearchQuery(''); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group",
                  activeTab === item.id 
                    ? "bg-olive-600 text-white shadow-lg shadow-olive-900/20" 
                    : "text-sand-200 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={18} className={cn("transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "text-sand-300")} />
                {item.label}
              </button>
            ))}
          </nav>

        <div className="p-6 space-y-3 border-t border-white/5">
          {user?.email === 'a.a.m.sharedgpt@gmail.com' && (
            <button
              onClick={toggleRole}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-white/5 text-sand-100 hover:bg-white/10 hover:text-white border border-white/5 group"
            >
              <div className="p-2 rounded-lg bg-olive-500/20 text-olive-400 group-hover:scale-110 transition-transform">
                {userRole === 'admin' ? <Shield size={18} /> : <ShieldAlert size={18} />}
              </div>
              <span>{userRole === 'admin' ? 'עבור לתצוגת תייר' : 'חזור לתצוגת מנהל'}</span>
            </button>
          )}
          
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-sand-800 flex items-center justify-center text-sand-100 font-bold serif border border-white/10">
              {user.name[0]}
            </div>
            <div className="flex-1 min-w-0 text-white">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-sand-300 font-bold">{userRole === 'admin' ? 'מנהל' : 'תייר'}</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-sand-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-olive-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-sand-100 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-full max-w-md group">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-sand-400 group-focus-within:text-olive-500 transition-colors" />
              <input 
                type="text"
                placeholder={`חפש ב${activeTab === 'summary' ? 'סיכום' : activeTab === 'schedule' ? 'לו"ז' : activeTab === 'transportation' ? 'תחבורה' : activeTab === 'equipment' ? 'ציוד' : activeTab === 'locations' ? 'מיקומים' : 'לינה'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-10 py-2.5 bg-sand-50 border border-sand-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500/10 focus:border-olive-500 transition-all text-right"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-sand-200 rounded-full transition-colors">
                  <X size={14} className="text-sand-400" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {userRole === 'admin' && (
              <>
                {activeTab === 'summary' && (
                  <>
                    <Button onClick={() => { setEditingTrip(selectedTrip || null); setIsTripModalOpen(true); }} variant="outline" className="h-16 w-32 flex-col items-end justify-center gap-0 px-4 border-olive-800 rounded-2xl text-olive-800 hover:bg-olive-50">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-bold leading-tight">ערוך</span>
                        <Edit size={18} className="text-olive-700" />
                      </div>
                      <span className="text-sm font-bold leading-tight w-full text-right">טיול</span>
                    </Button>
                    <Button onClick={() => handleDelete('trips', selectedTripId)} variant="outline" className="h-16 w-32 flex-col items-end justify-center gap-0 px-4 border-olive-800 rounded-2xl text-red-600 hover:bg-red-50">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-bold leading-tight">מחק</span>
                        <Trash2 size={18} className="text-red-500" />
                      </div>
                      <span className="text-sm font-bold leading-tight w-full text-right">טיול</span>
                    </Button>
                    <Button onClick={() => { setEditingTrip(null); setIsTripModalOpen(true); }} variant="outline" className="h-16 w-32 flex-col items-end justify-center gap-0 px-4 border-olive-800 rounded-2xl text-olive-800 hover:bg-olive-50">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-bold leading-tight">טיול</span>
                        <Plus size={18} className="text-olive-700" />
                      </div>
                      <span className="text-sm font-bold leading-tight w-full text-right">חדש</span>
                    </Button>
                    <Button onClick={handleDownloadSummary} variant="outline" size="sm" className="gap-2 bg-olive-50 text-olive-700 border-olive-200 hover:bg-olive-100">
                      <Download size={16} /> הורד סיכום
                    </Button>
                  </>
                )}
                {activeTab !== 'registrations' && activeTab !== 'summary' && activeTab !== 'schedule' && (
                                  <Button onClick={() => { 
                                    setEditingLogistics(null); 
                                    setDetectedZip('');
                                    setIsLogisticsModalOpen(true); 
                                  }} size="sm" className="gap-2">
                    <Plus size={16} /> 
                    {activeTab === 'transportation' ? 'הוסף תחבורה' : 
                     activeTab === 'locations' ? 'הוסף מיקום' :
                     activeTab === 'equipment' ? 'הוסף ציוד' :
                     activeTab === 'participants' ? 'הוסף משתתף' :
                     activeTab === 'suppliers' ? 'הוסף ספק' :
                     activeTab === 'globalEquipment' ? 'הוסף פריט למלאי' : 'הוסף משאב'}
                  </Button>
                )}
              </>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 [scrollbar-gutter:stable]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + selectedTripId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'summary' && (
                <div className="space-y-8">
                  {/* Trip Hero */}
                  <div className="relative p-10 rounded-[2.5rem] overflow-hidden shadow-xl shadow-sand-900/5">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-all duration-1000" 
                      style={{ backgroundImage: `url(${selectedTrip?.imageUrl || 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-sand-950/80 via-sand-950/40 to-transparent" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive-500/20 text-olive-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
                          <Clock size={12} /> {selectedTrip?.tripType || 'משלחת'} {selectedTrip?.tripNumber && `| #${selectedTrip.tripNumber}`}
                        </div>
                        <h2 className="text-5xl font-bold text-white serif tracking-tight">{selectedTrip?.tripName || 'בחר יעד'}</h2>
                        <div className="flex flex-wrap gap-6 text-sand-100/80 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-olive-400" />
                            {selectedTrip ? `${new Date(selectedTrip.startDate).toLocaleDateString('he-IL')} - ${new Date(selectedTrip.endDate).toLocaleDateString('he-IL')}` : 'לא נקבעו תאריכים'}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={18} className="text-olive-400" />
                            {selectedTrip?.groupSize || 0} חברי משלחת
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        {userRole === 'tourist' && (
                          <div className="flex justify-center">
                            {userRegistration ? (
                              <div className={cn(
                                "px-6 py-3 rounded-2xl text-sm font-bold backdrop-blur-md border flex items-center gap-2",
                                userRegistration.status === 'Approved' || userRegistration.status === 'מאושר'
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : userRegistration.status === 'Rejected' || userRegistration.status === 'נדחה'
                                  ? "bg-red-500/20 text-red-300 border-red-500/30"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                              )}>
                                {userRegistration.status === 'Approved' || userRegistration.status === 'מאושר' ? (
                                  <>
                                    <CheckCircle2 size={18} />
                                    <span>הצטרפותך אושרה!</span>
                                  </>
                                ) : userRegistration.status === 'Rejected' || userRegistration.status === 'נדחה' ? (
                                  <>
                                    <AlertCircle size={18} />
                                    <span>הבקשה נדחתה</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock size={18} />
                                    <span>בקשה בהמתנה</span>
                                  </>
                                )}
                              </div>
                            ) : isFull ? (
                              <div className="px-6 py-3 rounded-2xl text-sm font-bold backdrop-blur-md border bg-red-500/20 text-red-300 border-red-500/30 flex items-center gap-2">
                                <AlertCircle size={18} />
                                <span>המשלחת מלאה</span>
                              </div>
                            ) : (
                              <Button onClick={handleJoinRequest} className="w-full rounded-2xl py-4 text-lg shadow-lg shadow-olive-900/20">
                                <UserPlus size={20} className="ml-2" />
                                בקשה להצטרף לטיול
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Locations Summary - Always visible */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-sand-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-olive-50 text-olive-600">
                            <MapPin size={24} />
                          </div>
                          <h3 className="text-xl font-bold serif">מיקומים</h3>
                        </div>
                        <span className="text-xs font-bold text-sand-400 bg-sand-50 px-3 py-1 rounded-full">
                          {filteredData.locations.length} יעדים
                        </span>
                      </div>
                      <div className="space-y-4">
                        {filteredData.locations.slice(0, 3).map(l => (
                          <div key={l.id} className="flex items-center justify-between p-4 rounded-2xl bg-sand-50/50 border border-sand-100/50">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-sand-900">{l.locationName}</p>
                              <p className="text-[10px] text-sand-500 mt-1">{l.address}</p>
                            </div>
                            <MapPin size={14} className="text-olive-400" />
                          </div>
                        ))}
                        {filteredData.locations.length === 0 && (
                          <p className="text-center text-sand-400 py-4 text-sm italic">לא הוגדרו מיקומים</p>
                        )}
                      </div>
                    </div>

                    {/* Transportation Summary - Only if approved or admin */}
                    {isApproved && (
                      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-sand-100">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                              <Bus size={24} />
                            </div>
                            <h3 className="text-xl font-bold serif">תחבורה</h3>
                          </div>
                          <span className="text-xs font-bold text-sand-400 bg-sand-50 px-3 py-1 rounded-full">
                            {filteredData.transportation.length} פריטים
                          </span>
                        </div>
                        <div className="space-y-4">
                          {filteredData.transportation.slice(0, 3).map(t => (
                            <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl bg-sand-50/50 border border-sand-100/50">
                              <div className="flex-1">
                                <p className="text-sm font-bold text-sand-900">
                                  {t.transportationNumber && <span className="text-olive-600 ml-1">#{t.transportationNumber}</span>}
                                  {t.vehicleType}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] text-sand-500 mt-1">
                                  <span>
                                    {(() => {
                                      const l = locations.find(loc => loc.id === t.fromLocationId);
                                      return l ? l.locationName : t.fromLocationId || 'לא ידוע';
                                    })()}
                                    {t.fromAddress && <span className="text-sand-400 mr-1">({t.fromAddress})</span>}
                                  </span>
                                  <ChevronRight size={10} />
                                  <span>
                                    {(() => {
                                      const l = locations.find(loc => loc.id === t.toLocationId);
                                      return l ? l.locationName : t.toLocationId || 'לא ידוע';
                                    })()}
                                    {t.toAddress && <span className="text-sand-400 mr-1">({t.toAddress})</span>}
                                  </span>
                                  {t.departureDateTime && (
                                    <span className="mr-2 text-olive-600 font-bold flex items-center gap-0.5">
                                      <Clock size={10} />
                                      {t.departureTime || new Date(t.departureDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className={cn(
                                "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
                                t.status === 'Confirmed' || t.status === 'מאושר' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                              )}>
                                {t.status || 'ממתין'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Equipment Summary - Only if approved or admin */}
                    {isApproved && (
                      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-sand-100">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-orange-50 text-orange-600">
                              <Package size={24} />
                            </div>
                            <h3 className="text-xl font-bold serif">ציוד</h3>
                          </div>
                          <span className="text-xs font-bold text-sand-400 bg-sand-50 px-3 py-1 rounded-full">
                            {filteredData.tripEquipment.length} פריטים
                          </span>
                        </div>
                        <div className="space-y-4">
                          {filteredData.tripEquipment.slice(0, 3).map(e => {
                            const item = equipment.find(ge => ge.id === e.equipmentId);
                            return (
                              <div key={e.id} className="flex items-center justify-between p-4 rounded-2xl bg-sand-50/50 border border-sand-100/50">
                                <div>
                                  <p className="text-sm font-bold text-sand-900">{item?.itemName || e.equipmentId || 'ציוד לא ידוע'}</p>
                                  <p className="text-xs text-sand-500">{e.quantityAllocated} יחידות</p>
                                </div>
                                <div className={cn(
                                  "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
                                  e.status === 'Confirmed' || e.status === 'מאושר' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                )}>
                                  {e.status || 'ממתין'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Locked State for Tourists */}
                    {!isApproved && userRole === 'tourist' && (
                      <div className="lg:col-span-2 bg-sand-100/50 rounded-[2rem] p-8 border border-dashed border-sand-200 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="p-4 rounded-full bg-white shadow-sm text-sand-400">
                          <Shield size={32} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-sand-900">מידע נוסף ממתין לאישור</h4>
                          <p className="text-sm text-sand-500 max-w-md">פרטי התחבורה, הציוד והלו"ז המלא יהיו זמינים עבורך לאחר שאישור הצטרפותך למשלחת יתקבל על ידי המנהל.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Download Section */}
                  <div className="mt-12 p-10 rounded-[2.5rem] bg-sand-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-right">
                      <h3 className="text-2xl font-bold serif">הפקת דוח משלחת מלא</h3>
                      <p className="text-sand-400 text-sm">קבל קובץ מסכם הכולל את כל פרטי התחבורה, הציוד והמשתתפים.</p>
                    </div>
                    <Button 
                      onClick={handleDownloadSummary}
                      className="w-full md:w-auto px-8 py-4 rounded-2xl bg-olive-500 hover:bg-olive-600 text-white font-bold text-lg shadow-xl shadow-olive-900/20 flex items-center justify-center gap-3"
                    >
                      <Download size={24} />
                      הורד דוח מסכם (TXT)
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'queries' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold serif text-sand-900">דוחות ושאילתות חכמות</h2>
                      <p className="text-sand-500 text-sm mt-1">ניתוח נתוני המערכת והפקה מהירה של תובנות</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <BarChart3 className="text-olive-600" size={32} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { id: 'summer2026', label: 'משתתפי קיץ 2026', desc: 'תיירים שרשומים לטיולים ביוני-אוגוסט 2026', icon: Sparkles },
                      { id: 'highEquipmentTrips', label: 'משלחות "כבדות"', desc: 'משלחות עם יותר מ-5 פריטי ציוד מוקצים', icon: Package },
                      { id: 'multiServiceSuppliers', label: 'ספקים משולבים', desc: 'ספקים המספקים גם תחבורה וגם ציוד', icon: Building2 },
                      { id: 'mostPopularTrip', label: 'המשלחת הפופולרית ביותר', desc: 'המשלחת עם מספר הנרשמים הגבוה ביותר', icon: Users },
                      { id: 'adventureItinerary', label: 'מסלולי משלחות אתגר', desc: 'פירוט כל המיקומים של טיולי Adventure', icon: MapPin },
                      { id: 'adultsUnreturned', label: 'ציוד שלא הוחזר (מבוגרים)', desc: 'משתתפים מעל גיל 18 שלא החזירו ציוד מטיולים שעברו', icon: ShieldAlert },
                      { id: 'monthlySummary', label: 'סיכום חודשי', desc: 'סטטיסטיקת כמות משלחות וגודל קבוצה לפי חודשים', icon: Calendar },
                      { id: 'popularLocations', label: 'טופ 3 מיקומים', desc: 'המיקומים הפופולריים ביותר וכמות המבקרים', icon: Map }
                    ].map(report => {
                      const Icon = report.icon;
                      return (
                        <button
                          key={report.id}
                          onClick={() => setSelectedReportId(report.id)}
                          className={cn(
                            "p-6 rounded-[2rem] border text-right transition-all group",
                            selectedReportId === report.id 
                              ? "bg-olive-600 border-olive-600 text-white shadow-xl shadow-olive-900/20" 
                              : "bg-white border-sand-100 text-sand-900 hover:border-olive-200 hover:shadow-lg"
                          )}
                        >
                          <div className={cn(
                            "p-3 rounded-2xl w-fit mb-4",
                            selectedReportId === report.id ? "bg-white/20" : "bg-sand-50 group-hover:bg-olive-50 transition-colors"
                          )}>
                            <Icon size={24} className={selectedReportId === report.id ? "text-white" : "text-olive-600"} />
                          </div>
                          <h4 className="font-bold text-lg leading-tight mb-2">{report.label}</h4>
                          <p className={cn(
                            "text-xs leading-relaxed",
                            selectedReportId === report.id ? "text-white/70" : "text-sand-500"
                          )}>
                            {report.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {selectedReportId && (
                    <motion.div
                      layout
                      id="report-results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* SQL Code Block */}
                      {reportSql && (
                        <div className="bg-sand-900 rounded-[2rem] p-6 text-left overflow-hidden relative group">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-sand-400">
                              <Database size={16} />
                              <span className="text-xs font-bold uppercase tracking-widest">שאילתת SQL מקורית</span>
                            </div>
                            <div className="p-1.5 rounded-lg bg-white/10 text-white/50 group-hover:text-white/80 transition-colors">
                              <Info size={14} />
                            </div>
                          </div>
                          <pre className="text-xs text-olive-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed ltr">
                            {reportSql}
                          </pre>
                        </div>
                      )}

                      <div className="bg-white rounded-[2.5rem] border border-sand-100 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-sand-50 bg-sand-50/30 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <BarChart3 size={20} className="text-olive-600" />
                            <h3 className="font-bold serif text-sand-900">תוצאות השאילתה</h3>
                          </div>
                          {reportData && reportData.length > 0 && (
                            <div className="text-xs font-bold text-sand-400 bg-sand-100 px-3 py-1 rounded-full uppercase tracking-widest">
                              {reportData.length} שורות נמצאו
                            </div>
                          )}
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-right">
                            <thead>
                              <tr className="bg-sand-50/50">
                                {reportData && reportData.length > 0 ? Object.keys(reportData[0]).map(key => (
                                  <th key={key} className="px-8 py-4 text-xs font-bold text-sand-500 uppercase tracking-widest border-b border-sand-100">
                                    {key}
                                  </th>
                                )) : (
                                  <th className="px-8 py-8 text-center text-sand-400 italic font-medium">לא נמצאו תוצאות התואמות לשאילתה זו</th>
                                )}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-sand-50">
                              {reportData && reportData.map((row, i) => (
                                <tr key={i} className="hover:bg-sand-50/50 transition-colors">
                                  {Object.values(row).map((val: any, j) => (
                                    <td key={j} className="px-8 py-4 text-sm text-sand-700 whitespace-nowrap">
                                      {val}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold serif text-sand-900">לו"ז משלחת</h2>
                      <p className="text-sand-500 text-sm mt-1">ריכוז כל האירועים והנסיעות לפי סדר כרונולוגי</p>
                    </div>
                  </div>

                  {scheduleItems.length > 0 ? (
                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-sand-200 before:to-transparent">
                      {scheduleItems.reduce((acc: any[], item, index) => {
                        const date = new Date(item.dateTime).toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                        const prevDate = index > 0 ? new Date(scheduleItems[index - 1].dateTime).toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : null;
                        
                        if (date !== prevDate) {
                          acc.push(
                            <div key={`date-${date}`} className="relative z-10 flex items-center justify-center mb-8">
                              <span className="px-4 py-1.5 rounded-full bg-sand-100 text-sand-600 text-xs font-bold border border-sand-200 shadow-sm">
                                {date}
                              </span>
                            </div>
                          );
                        }

                        acc.push(
                          <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            {/* Icon */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-sand-50 text-olive-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-20 group-hover:bg-olive-600 group-hover:text-white transition-all duration-300">
                              <item.icon size={18} />
                            </div>
                            {/* Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-[2rem] shadow-sm border border-sand-100 hover:shadow-md transition-all">
                              <div className="flex items-center justify-between mb-2">
                                <time className="font-bold text-olive-600 text-sm">
                                  {new Date(item.dateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                </time>
                                <div className={cn(
                                  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                                  item.status === 'Confirmed' || item.status === 'Ready' || item.status === 'Booked' || item.status === 'מאושר' || item.status === 'מוכן' || item.status === 'הוזמן'
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-blue-100 text-blue-700"
                                )}>
                                  {item.status || 'מאושר'}
                                </div>
                              </div>
                              <div className="text-sand-900 font-bold mb-1 text-right">{item.title}</div>
                              <div className="text-sand-500 text-xs text-right">{item.description}</div>
                            </div>
                          </div>
                        );
                        return acc;
                      }, [])}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-sand-200">
                      <div className="p-4 rounded-full bg-sand-50 text-sand-300 mb-4">
                        <Calendar size={48} />
                      </div>
                      <p className="text-sand-500 font-medium">אין אירועים מתוזמנים כרגע</p>
                      <p className="text-sand-400 text-sm">הוסף תחבורה או מיקומים עם תאריך ושעה כדי לראות אותם כאן</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab !== 'summary' && activeTab !== 'schedule' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold serif text-sand-900 capitalize">
                        {activeTab === 'transportation' ? 'תחבורה' : 
                         activeTab === 'equipment' ? 'ציוד למשלחת' : 
                         activeTab === 'locations' ? 'מיקומים' :
                         activeTab === 'participants' ? 'משתתפים' : 
                         activeTab === 'suppliers' ? 'ספקים' :
                         activeTab === 'globalEquipment' ? 'מלאי ציוד' :
                         activeTab === 'registrations' ? 'רישומים' : 'לוגיסטיקה'}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {(activeTab === 'transportation' ? filteredData.transportation : 
                      activeTab === 'locations' ? filteredData.locations :
                      activeTab === 'participants' ? filteredData.participants :
                      activeTab === 'registrations' ? filteredData.registrations :
                      activeTab === 'suppliers' ? filteredData.suppliers :
                      activeTab === 'globalEquipment' ? filteredData.globalEquipment :
                      filteredData.tripEquipment).map((item: any) => (
                      <div key={item.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-sand-100 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div className={cn(
                            "p-3 rounded-2xl bg-sand-50 text-olive-600 transition-all",
                            activeTab === 'registrations' && item.status === 'Pending' && userRole === 'admin' 
                              ? "hover:bg-green-600 hover:text-white cursor-pointer" 
                              : "group-hover:bg-olive-600 group-hover:text-white"
                          )}
                          onClick={() => {
                            if (activeTab === 'registrations' && item.status === 'Pending' && userRole === 'admin') {
                              handleApproveRegistration(item.id, 'Approved');
                            }
                          }}
                          title={activeTab === 'registrations' && item.status === 'Pending' && userRole === 'admin' ? "לחץ לאישור מהיר" : ""}
                          >
                            {activeTab === 'transportation' ? (item.vehicleType === 'מטוס' ? <Plane size={24} /> : <Bus size={24} />) : 
                             activeTab === 'equipment' ? <Package size={24} /> : 
                             activeTab === 'locations' ? <Map size={24} /> :
                             activeTab === 'participants' ? <Users size={24} /> : 
                             activeTab === 'registrations' ? <UserPlus size={24} /> : 
                             activeTab === 'suppliers' ? <Building2 size={24} /> :
                             activeTab === 'globalEquipment' ? <Package size={24} /> : <Building2 size={24} />}
                          </div>
                          {item.status && (
                            <div className={cn(
                              "text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full",
                              item.status === 'Confirmed' || item.status === 'Ready' || item.status === 'Booked' || item.status === 'מאושר' || item.status === 'מוכן' || item.status === 'הוזמן'
                                ? "bg-green-100 text-green-700" 
                                : item.status === 'Pending' || item.status === 'ממתין'
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            )}>
                              {item.status}
                            </div>
                          )}
                        </div>

                        <h4 className="text-lg font-bold text-sand-900 mb-1">
                          {activeTab === 'transportation' ? (
                            <div className="flex flex-col">
                              <span>
                                {item.transportationNumber && <span className="text-olive-600 ml-2">#{item.transportationNumber}</span>}
                                {item.vehicleType}
                              </span>
                              <div className="flex items-center gap-2 mt-1 text-sm font-normal text-sand-600">
                                <span className="bg-sand-100 px-2 py-0.5 rounded-lg">
                                  {(() => {
                                    const l = locations.find(loc => loc.id === item.fromLocationId);
                                    return l ? l.locationName : item.fromLocationId || 'לא ידוע';
                                  })()}
                                  {item.fromAddress && <span className="text-sand-400 mr-1">({item.fromAddress})</span>}
                                </span>
                                <ChevronRight size={14} className="text-sand-400" />
                                <span className="bg-sand-100 px-2 py-0.5 rounded-lg">
                                  {(() => {
                                    const l = locations.find(loc => loc.id === item.toLocationId);
                                    return l ? l.locationName : item.toLocationId || 'לא ידוע';
                                  })()}
                                  {item.toAddress && <span className="text-sand-400 mr-1">({item.toAddress})</span>}
                                </span>
                                {item.departureDateTime && (
                                  <span className="bg-olive-50 text-olive-700 px-2 py-0.5 rounded-lg flex items-center gap-1" title="זמן יציאה">
                                    <Clock size={12} />
                                    {item.departureTime || new Date(item.departureDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}
                                {item.arrivalDateTime && (
                                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg flex items-center gap-1" title="זמן הגעה">
                                    <Clock size={12} />
                                    {item.arrivalTime || new Date(item.arrivalDateTime).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : 
                           activeTab === 'equipment' ? (() => {
                             const e = equipment.find(eq => eq.id === item.equipmentId);
                             return e ? e.itemName : item.equipmentId || 'ציוד לא ידוע';
                           })() :
                           activeTab === 'locations' ? item.locationName : 
                           activeTab === 'participants' ? `${item.firstName} ${item.lastName}` : 
                           activeTab === 'registrations' ? participants.find(p => p.id === item.participantId)?.firstName + ' ' + participants.find(p => p.id === item.participantId)?.lastName :
                           activeTab === 'suppliers' ? (
                             <span>
                               {item.supplierNumber && <span className="text-olive-600 ml-2">#{item.supplierNumber}</span>}
                               {item.companyName}
                             </span>
                           ) :
                           activeTab === 'globalEquipment' ? item.itemName :
                           item.companyName}
                        </h4>
                        
                        {(item.supplierId || item.supplierName) && (
                          <div className="flex items-center gap-1 mb-2 text-[10px] text-olive-600 font-bold">
                            <Building2 size={10} />
                            <span>ספק: {(() => {
                              const s = suppliers.find(sup => sup.id === item.supplierId);
                              if (s) return s.companyName;
                              if (activeTab === 'equipment') {
                                const ge = equipment.find(e => e.id === item.equipmentId);
                                const gs = suppliers.find(sup => sup.id === ge?.supplierId);
                                if (gs) return gs.companyName;
                                return ge?.supplierId || item.supplierId || item.supplierName || 'לא ידוע';
                              }
                              return (item.supplierId || item.supplierName || 'לא ידוע');
                            })()}</span>
                          </div>
                        )}

                        <div className="text-xs text-sand-500 mb-4">
                          {activeTab === 'transportation' ? `${item.capacity} מושבים` :
                           activeTab === 'equipment' ? `כמות: ${item.quantityAllocated}` :
                           activeTab === 'locations' ? (
                             <div className="flex flex-col gap-1">
                               <span>{item.region}</span>
                               <span className="text-[10px] text-sand-400">{item.address}{item.zipCode ? ` | מיקוד: ${item.zipCode}` : ''}</span>
                             </div>
                           ) :
                           activeTab === 'participants' ? item.email : 
                           activeTab === 'registrations' ? (
                             <div className="flex flex-col gap-1">
                               <span>תאריך רישום: {item.registrationDate}</span>
                               {item.transportationId && (
                                 <span className="text-olive-600 font-bold flex items-center gap-1">
                                   {(() => {
                                      const t = transportation.find(t => t.id === item.transportationId);
                                      return t?.vehicleType === 'מטוס' ? <Plane size={10} /> : <Bus size={10} />;
                                    })()}
                                   {(() => {
                                      const t = transportation.find(t => t.id === item.transportationId);
                                      return t?.vehicleType === 'מטוס' ? 'מטוס' : 'אוטובוס';
                                    })()}: {transportation.find(t => t.id === item.transportationId)?.vehicleType || 'לא ידוע'}
                                 </span>
                               )}
                             </div>
                           ) :
                           activeTab === 'suppliers' ? (
                             <div className="flex flex-col gap-1">
                               <span>{item.serviceType}</span>
                               {(() => {
                                 const supplierGlobalEquipment = equipment.filter(e => 
                                   e.supplierId && (
                                     e.supplierId === item.id || 
                                     e.supplierId.trim().toLowerCase() === item.companyName.trim().toLowerCase()
                                   )
                                 );
                                 const supplierTripEquipment = tripEquipment.filter(te => 
                                   te.supplierId && (
                                     te.supplierId === item.id || 
                                     te.supplierId.trim().toLowerCase() === item.companyName.trim().toLowerCase()
                                   )
                                 );
                                 
                                 const allEquipmentNames = Array.from(new Set([
                                   ...supplierGlobalEquipment.map(e => e.itemName),
                                   ...supplierTripEquipment.map(te => {
                                     const ge = equipment.find(e => e.id === te.equipmentId);
                                     return ge ? ge.itemName : te.equipmentId;
                                   })
                                 ])).filter(Boolean);

                                 if (allEquipmentNames.length > 0) {
                                   return (
                                     <div className="mt-1 pt-1 border-t border-sand-50">
                                       <div className="flex flex-wrap gap-1">
                                         {allEquipmentNames.map((name, idx) => (
                                           <span key={idx} className="bg-sand-50 text-sand-600 px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1">
                                             <Package size={8} />
                                             {name}
                                           </span>
                                         ))}
                                       </div>
                                     </div>
                                   );
                                 }
                                 return null;
                               })()}
                             </div>
                           ) :
                           activeTab === 'globalEquipment' ? `מלאי: ${item.totalInStock}` :
                           item.serviceType}
                        </div>

                        {activeTab !== 'schedule' && activeTab !== 'summary' && (
                          <div className="space-y-4 pt-4 border-t border-sand-50">
                            {activeTab === 'transportation' && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-sand-400">
                                    משתתפים ב{item.vehicleType === 'מטוס' ? 'מטוס' : 'אוטובוס'}
                                  </span>
                                  <span className="text-[10px] text-sand-400">
                                    {registrations.filter(r => r.transportationId === item.id).length} / {item.capacity}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto scrollbar-hide">
                                  {registrations
                                    .filter(r => r.transportationId === item.id)
                                    .map(r => {
                                      const p = participants.find(part => part.id === r.participantId);
                                      return p ? (
                                        <span key={r.id} className="text-[10px] bg-olive-50 text-olive-700 px-2 py-0.5 rounded-full border border-olive-100">
                                          {p.firstName} {p.lastName}
                                        </span>
                                      ) : null;
                                    })}
                                  {registrations.filter(r => r.transportationId === item.id).length === 0 && (
                                    <span className="text-[10px] text-sand-400 italic">אין משתתפים רשומים</span>
                                  )}
                                </div>
                                {userRole === 'admin' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setAssigningTransportationId(item.id);
                                      setIsAssignModalOpen(true);
                                    }}
                                    className="w-full mt-2 py-1.5 text-[10px] font-bold text-olive-600 border border-olive-200 rounded-lg hover:bg-olive-50 transition-colors flex items-center justify-center gap-1"
                                  >
                                    <UserPlus size={12} />
                                    שייך משתתפים
                                  </button>
                                )}
                              </div>
                            )}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-sand-400">הערות משלחת</span>
                                <span className="text-[10px] text-sand-400">{item.comments?.length || 0} הערות</span>
                              </div>
                              <div className="max-h-24 overflow-y-auto scrollbar-hide space-y-2">
                                {item.comments?.map((c: any) => (
                                  <div key={c.id} className="text-xs bg-sand-50 p-2 rounded-lg">
                                    <p className="font-bold text-sand-700 mb-0.5">{c.author}</p>
                                    <p className="text-sand-600">{c.text}</p>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="הוסף הערה..."
                                  className="flex-1 text-xs px-3 py-2 bg-sand-50 border border-sand-100 rounded-lg focus:outline-none focus:border-olive-500 text-right"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      addComment(activeTab, item.id, e.currentTarget.value);
                                      e.currentTarget.value = '';
                                    }
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => acknowledge(activeTab, item.id)}
                                  className={cn(
                                    "p-2 rounded-lg transition-all",
                                    item.acknowledgedBy?.includes(user.id) ? "bg-olive-100 text-olive-600" : "bg-sand-50 text-sand-400 hover:bg-sand-100"
                                  )}
                                >
                                  <CheckCircle2 size={18} />
                                </button>
                                <span className="text-[10px] font-bold text-sand-400">
                                  {item.acknowledgedBy?.length || 0} נצפה
                                </span>
                              </div>
                              
                              <div className="flex gap-2">
                                {activeTab === 'registrations' && userRole === 'admin' && item.status === 'Pending' && (
                                  <div className="flex gap-2 mr-2 pr-2 border-r border-sand-100">
                                    <button 
                                      onClick={() => handleApproveRegistration(item.id, 'Approved')}
                                      className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors text-xs font-bold"
                                    >
                                      <CheckCircle2 size={14} />
                                      אשר
                                    </button>
                                    <button 
                                      onClick={() => handleApproveRegistration(item.id, 'Rejected')}
                                      className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors text-xs font-bold"
                                    >
                                      <X size={14} />
                                      דחה
                                    </button>
                                  </div>
                                )}
                                {userRole === 'admin' && (
                                  <>
                                    <button 
                                      onClick={() => {
                                        setEditingLogistics(item);
                                        setDetectedZip('');
                                        setIsLogisticsModalOpen(true);
                                      }}
                                      className="p-2 bg-sand-50 text-sand-600 hover:bg-sand-100 rounded-lg transition-all"
                                    >
                                      <Edit size={18} />
                                    </button>
                                    <button 
                                      onClick={() => {
                                        let coll = activeTab;
                                        if (coll === 'equipment') coll = 'tripEquipment';
                                        if (coll === 'globalEquipment') coll = 'equipment';
                                        handleDelete(coll, item.id);
                                      }}
                                      className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <Modal 
        isOpen={isTripModalOpen} 
        onClose={() => setIsTripModalOpen(false)} 
        title={editingTrip ? 'ערוך משלחת' : 'משלחת חדשה'}
      >
        <form onSubmit={handleAddTrip} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">מספר מזהה</label>
              <Input name="tripNumber" defaultValue={editingTrip?.tripNumber} required placeholder="למשל: 101" className="text-right" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">שם המשלחת</label>
              <Input name="tripName" defaultValue={editingTrip?.tripName} required placeholder="למשל: הרפתקה במדבר" className="text-right" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">תאריך התחלה</label>
              <Input name="startDate" type="date" defaultValue={editingTrip?.startDate} required className="text-right" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">תאריך סיום</label>
              <Input name="endDate" type="date" defaultValue={editingTrip?.endDate} required className="text-right" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">גודל קבוצה</label>
              <Input name="groupSize" type="number" defaultValue={editingTrip?.groupSize} required className="text-right" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">סוג</label>
            <select name="tripType" defaultValue={editingTrip?.tripType || 'הרפתקה'} className="w-full px-4 py-2.5 bg-white border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:border-olive-500 text-right">
              <option>הרפתקה</option>
              <option>לימודי</option>
              <option>פנאי</option>
              <option>טכני</option>
            </select>
          </div>
          <Button type="submit" loading={isSavingTrip} className="w-full py-3 mt-4">שמור משלחת</Button>
        </form>
      </Modal>

      <Modal 
        isOpen={isLogisticsModalOpen} 
        onClose={() => setIsLogisticsModalOpen(false)} 
        title={`הוסף ${activeTab === 'transportation' ? 'תחבורה' : activeTab === 'equipment' ? 'ציוד' : activeTab === 'locations' ? 'מיקום' : activeTab === 'participants' ? 'משתתף' : activeTab === 'suppliers' ? 'ספק' : activeTab === 'globalEquipment' ? 'פריט למלאי' : 'רישום'}`}
      >
        <form onSubmit={handleAddLogistics} className="space-y-4">
          {activeTab === 'transportation' && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input name="transportationNumber" defaultValue={editingLogistics?.transportationNumber} placeholder="מס' מזהה" className="text-right" />
                </div>
                <div className="col-span-2">
                  <Input name="vehicleType" defaultValue={editingLogistics?.vehicleType} placeholder="סוג רכב (למשל: אוטובוס)" required className="text-right" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">ממיקום (תחנת מוצא)</label>
                  <Input name="fromLocationId" defaultValue={editingLogistics?.fromLocationId} placeholder="הכנס מיקום..." className="text-right" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sand-400">כתובת מוצא מדוייקת</label>
                  <Input name="fromAddress" defaultValue={editingLogistics?.fromAddress} placeholder="למשל: רחוב הרצל 1, תל אביב" className="text-right" />
                </div>
              </div>
              <Input name="capacity" type="number" defaultValue={editingLogistics?.capacity} placeholder="קיבולת" required className="text-right" />
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sand-400">יציאה (תאריך ושעה)</label>
                  <Input name="departureDateTime" type="datetime-local" defaultValue={editingLogistics?.departureDateTime} required className="text-right" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sand-400">הגעה (תאריך ושעה)</label>
                  <Input name="arrivalDateTime" type="datetime-local" defaultValue={editingLogistics?.arrivalDateTime} required className="text-right" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">למיקום (תחנת יעד)</label>
                  <Input name="toLocationId" defaultValue={editingLogistics?.toLocationId} placeholder="הכנס מיקום..." className="text-right" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sand-400">כתובת יעד מדוייקת</label>
                  <Input name="toAddress" defaultValue={editingLogistics?.toAddress} placeholder="למשל: רחוב הירקון 99, תל אביב" className="text-right" />
                </div>
              </div>
              <SearchableSelect 
                name="supplierId"
                label="ספק"
                placeholder="בחר ספק או הוסף חדש..."
                defaultValue={editingLogistics?.supplierId}
                options={suppliers.filter(s => s.tripId === selectedTripId || !s.tripId).map(s => ({ id: s.id, label: s.companyName }))}
                allowCustom={true}
              />
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">סטטוס</label>
                <select name="status" defaultValue={editingLogistics?.status || 'ממתין'} className="w-full px-4 py-2.5 bg-white border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:border-olive-500 text-right">
                  <option value="ממתין">ממתין</option>
                  <option value="מאושר">מאושר</option>
                </select>
              </div>
            </>
          )}
          {activeTab === 'equipment' && (
            <>
              <SearchableSelect 
                name="equipmentId"
                label="ציוד"
                placeholder="בחר ציוד מהמלאי או הוסף חדש..."
                defaultValue={editingLogistics?.equipmentId}
                options={equipment.filter(e => e.tripId === selectedTripId || !e.tripId).map(e => ({ id: e.id, label: e.itemName }))}
                allowCustom={true}
              />
              <Input name="quantityAllocated" type="number" defaultValue={editingLogistics?.quantityAllocated} placeholder="כמות להקצאה" required className="text-right" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sand-400">תאריך לקיחה</label>
                  <Input name="checkoutDate" type="date" defaultValue={editingLogistics?.checkoutDate} required className="text-right" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sand-400">תאריך החזרה</label>
                  <Input name="returnDate" type="date" defaultValue={editingLogistics?.returnDate} required className="text-right" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">סטטוס</label>
                <select name="status" defaultValue={editingLogistics?.status || 'ממתין'} className="w-full px-4 py-2.5 bg-white border border-sand-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:border-olive-500 text-right">
                  <option value="ממתין">ממתין</option>
                  <option value="מוכן">מוכן</option>
                </select>
              </div>
              <SearchableSelect 
                name="supplierId"
                label="ספק"
                placeholder="בחר ספק (למשל: מגן דוד אדום) או הוסף חדש..."
                defaultValue={editingLogistics?.supplierId}
                options={suppliers.filter(s => s.tripId === selectedTripId || !s.tripId).map(s => ({ id: s.id, label: s.companyName }))}
                allowCustom={true}
              />
            </>
          )}
          {activeTab === 'locations' && (
            <>
              <Input name="locationName" id="locName" defaultValue={editingLogistics?.locationName} placeholder="שם המיקום" required className="text-right" />
              <div className="grid grid-cols-2 gap-4">
                <Input name="region" defaultValue={editingLogistics?.region} placeholder="אזור" required className="text-right" />
                <div className="relative">
                  <Input 
                    name="zipCode" 
                    value={detectedZip || editingLogistics?.zipCode || ''} 
                    onChange={(e) => setDetectedZip(e.target.value)}
                    placeholder="מיקוד" 
                    className="text-right pl-10" 
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const name = (document.getElementById('locName') as HTMLInputElement)?.value;
                      const addr = (document.getElementById('locAddr') as HTMLInputElement)?.value;
                      detectZipCode(name, addr);
                    }}
                    disabled={isDetectingZip}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 text-olive-600 hover:bg-olive-50 rounded-lg transition-colors disabled:opacity-50"
                    title="זיהוי מיקוד אוטומטי"
                  >
                    <Sparkles size={16} className={isDetectingZip ? "animate-pulse" : ""} />
                  </button>
                </div>
              </div>
              <Input name="address" id="locAddr" defaultValue={editingLogistics?.address} placeholder="כתובת" required className="text-right" />
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-sand-400">תאריך ושעת ביקור (אופציונלי)</label>
                <Input name="visitDateTime" type="datetime-local" defaultValue={editingLogistics?.visitDateTime} className="text-right" />
              </div>
              <Input name="description" defaultValue={editingLogistics?.description} placeholder="תיאור" className="text-right" />
              <SearchableSelect 
                name="supplierId"
                label="ספק משויך"
                placeholder="בחר ספק או הוסף חדש..."
                defaultValue={editingLogistics?.supplierId}
                options={suppliers.filter(s => s.tripId === selectedTripId || !s.tripId).map(s => ({ id: s.id, label: s.companyName }))}
                allowCustom={true}
              />
            </>
          )}
          {activeTab === 'participants' && (
            <>
              <Input name="firstName" defaultValue={editingLogistics?.firstName} placeholder="שם פרטי" required className="text-right" />
              <Input name="lastName" defaultValue={editingLogistics?.lastName} placeholder="שם משפחה" required className="text-right" />
              <Input name="phone" defaultValue={editingLogistics?.phone} placeholder="טלפון" required className="text-right" />
              <Input name="email" type="email" defaultValue={editingLogistics?.email} placeholder="אימייל" required className="text-right" />
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-sand-400">תאריך לידה</label>
                <Input 
                  name="birthday" 
                  type="date" 
                  defaultValue={editingLogistics?.birthday} 
                  required 
                  className="text-right" 
                  onChange={(e) => {
                    const birthDate = new Date(e.target.value);
                    if (!isNaN(birthDate.getTime())) {
                      const today = new Date();
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const m = today.getMonth() - birthDate.getMonth();
                      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                      }
                      setCalculatedAge(age);
                    }
                  }}
                />
              </div>
              <Input 
                name="age" 
                type="number" 
                value={calculatedAge} 
                onChange={(e) => setCalculatedAge(e.target.value)}
                placeholder="גיל" 
                required 
                className="text-right" 
              />
            </>
          )}
          {activeTab === 'suppliers' && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input name="supplierNumber" defaultValue={editingLogistics?.supplierNumber} placeholder="מס' מזהה" className="text-right" />
                </div>
                <div className="col-span-2">
                  <Input name="companyName" defaultValue={editingLogistics?.companyName} placeholder="שם החברה" required className="text-right" />
                </div>
              </div>
              <select name="serviceType" defaultValue={editingLogistics?.serviceType} required className="w-full px-4 py-2.5 bg-white border border-sand-200 rounded-xl text-sm text-right">
                <option value="Equipment">ציוד</option>
                <option value="Transportation">הסעות</option>
                <option value="Venue">אתרים/מיקומים</option>
              </select>
              <Input name="contactPhone" defaultValue={editingLogistics?.contactPhone} placeholder="טלפון ליצירת קשר" required className="text-right" />
            </>
          )}
          {activeTab === 'registrations' && (
            <>
              <SearchableSelect 
                name="participantId"
                label="משתתף"
                placeholder="בחר משתתף..."
                defaultValue={editingLogistics?.participantId}
                options={participants.map(p => ({ id: p.id, label: `${p.firstName} ${p.lastName}` }))}
              />
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-sand-400">תאריך רישום</label>
                <Input name="registrationDate" type="date" defaultValue={editingLogistics?.registrationDate} required className="text-right" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-sand-400">סטטוס</label>
                <select name="status" defaultValue={editingLogistics?.status} className="w-full px-4 py-2.5 bg-white border border-sand-200 rounded-xl text-sm text-right">
                  <option>מאושר</option>
                  <option>ממתין</option>
                </select>
              </div>
              <SearchableSelect 
                name="transportationId"
                label="תחבורה/הסעה"
                placeholder="בחר תחבורה..."
                defaultValue={editingLogistics?.transportationId}
                options={transportation.filter(t => t.tripId === selectedTripId).map(t => ({ id: t.id, label: `${t.vehicleType} (${t.capacity} מושבים)` }))}
              />
            </>
          )}
          {activeTab === 'globalEquipment' && (
            <>
              <Input name="itemName" defaultValue={editingLogistics?.itemName} placeholder="שם הפריט" required className="text-right" />
              <Input name="totalInStock" type="number" defaultValue={editingLogistics?.totalInStock} placeholder="כמות במלאי" required className="text-right" />
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-sand-500 ml-1">ספק ברירת מחדל</label>
                <Input name="supplierId" defaultValue={editingLogistics?.supplierId} placeholder="הכנס שם ספק..." className="text-right" />
              </div>
            </>
          )}
          <Button type="submit" className="w-full py-3 mt-4">שמור</Button>
        </form>
      </Modal>
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => { setIsAssignModalOpen(false); setAssigningTransportationId(null); }}
        title="שיוך משתתפים לתחבורה"
      >
        <div className="space-y-4">
          <p className="text-sm text-sand-600 mb-4">
            בחר את המשתתפים שברצונך לשייך ל{transportation.find(t => t.id === assigningTransportationId)?.vehicleType || 'תחבורה זו'}.
          </p>
          <div className="max-h-96 overflow-y-auto pr-2 space-y-2 scrollbar-hide">
            {participants
              .filter(p => registrations.some(r => r.participantId === p.id && r.tripId === selectedTripId))
              .map(p => {
                const reg = registrations.find(r => r.participantId === p.id && r.tripId === selectedTripId);
                const isAssignedToThis = reg?.transportationId === assigningTransportationId;
                const otherBus = reg?.transportationId && !isAssignedToThis ? transportation.find(t => t.id === reg.transportationId) : null;
                
                return (
                  <div 
                    key={p.id} 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                      isAssignedToThis ? "bg-olive-50 border-olive-200" : "bg-white border-sand-100 hover:border-sand-200"
                    )}
                    onClick={() => {
                      const currentIds = registrations
                        .filter(r => r.transportationId === assigningTransportationId)
                        .map(r => r.participantId);
                      
                      let newIds;
                      if (isAssignedToThis) {
                        newIds = currentIds.filter(id => id !== p.id);
                      } else {
                        newIds = [...currentIds, p.id];
                      }
                      handleAssignParticipants(assigningTransportationId!, newIds);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                        isAssignedToThis ? "bg-olive-600 border-olive-600 text-white" : "bg-white border-sand-200"
                      )}>
                        {isAssignedToThis && <Check size={14} />}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-sand-900">{p.firstName} {p.lastName}</p>
                        {otherBus && (
                          <p className="text-[10px] text-amber-600 font-medium">רשום ל: {otherBus.vehicleType}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="pt-4 border-t border-sand-100 flex justify-end">
            <Button onClick={() => setIsAssignModalOpen(false)} variant="primary" className="w-full">סגור</Button>
          </div>
        </div>
      </Modal>

      <AnimatePresence>
        {deleteConfirmation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-sand-900 mb-2 serif">אישור מחיקה</h3>
              <p className="text-sand-600 mb-8">האם אתה בטוח שברצונך למחוק פריט זה? פעולה זו אינה ניתנת לביטול.</p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setDeleteConfirmation(null)}
                >
                  ביטול
                </Button>
                <Button 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white border-none" 
                  onClick={confirmDelete}
                >
                  מחק
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
