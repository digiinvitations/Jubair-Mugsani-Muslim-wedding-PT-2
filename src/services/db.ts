import { doc, getDoc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { WeddingData } from "../types";
import { weddingData as defaultData } from "../data";

export const TEMPLATE_FIELD_NAME = "MuslimremixtemplateforJabairAli";
export const DEDICATED_SLOT_ID = "wedding_data_MuslimremixtemplateforJabairAli";
export const OFFICIAL_DOC_ID = "wedding_data_rl2cohqvo2tuixw5mclqfx-14313311583";
export const OFFICIAL_HASH = "rl2cohqvo2tuixw5mclqfx-14313311583";

// Generate a unique, isolated ID to prevent any overlap with official or other remix websites
export function getEnvironmentDocId(): string {
  if (typeof window === 'undefined') return DEDICATED_SLOT_ID;

  // Check if user set a custom slot override in localStorage
  try {
    const customSlot = localStorage.getItem("wedding_custom_slot_id");
    if (customSlot && customSlot.trim()) {
      const trimmed = customSlot.trim();
      // Prevent custom slot from pointing to official master
      if (trimmed !== OFFICIAL_DOC_ID && trimmed !== "wedding_data_official") {
        return trimmed;
      }
    }
  } catch (e) {
    // localStorage might be unavailable in some sandboxes
  }

  // Dedicated, isolated slot for MuslimremixtemplateforJabairAli
  return DEDICATED_SLOT_ID;
}

export function isOfficialInstance(): boolean {
  return false;
}

export function setCustomSlotId(slotId: string) {
  if (typeof window === 'undefined') return;
  try {
    if (slotId && slotId.trim()) {
      const trimmed = slotId.trim();
      if (trimmed === OFFICIAL_DOC_ID || trimmed === "wedding_data_official") {
        console.warn("Remix instance cannot bind to official master slot.");
        return;
      }
      localStorage.setItem("wedding_custom_slot_id", trimmed);
    } else {
      localStorage.removeItem("wedding_custom_slot_id");
    }
  } catch (e) {}
}

export function getRsvpCollectionName(): string {
  if (typeof window === 'undefined') return "rsvps_MuslimremixtemplateforJabairAli";

  try {
    const customSlot = localStorage.getItem("wedding_custom_slot_id");
    if (customSlot && customSlot.trim()) {
      return `rsvps_${customSlot.trim()}`;
    }
  } catch (e) {}

  return "rsvps_MuslimremixtemplateforJabairAli";
}

export async function getWeddingData(): Promise<WeddingData> {
  try {
    const slotId = getEnvironmentDocId();
    const docRef = doc(db, "weddingConfig", slotId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existing = docSnap.data() as WeddingData;
      return {
        ...defaultData,
        ...existing,
        logoSize: existing.logoSize ?? defaultData.logoSize ?? 240
      };
    } else {
      // Initialize new dedicated slot for MuslimremixtemplateforJabairAli
      const initialData: WeddingData = {
        ...defaultData,
        isRemix: true,
        remixSlotId: slotId,
        templateName: TEMPLATE_FIELD_NAME,
        lastUpdated: new Date().toISOString()
      };

      await setDoc(docRef, initialData);
      return initialData;
    }
  } catch (error) {
    console.error("Error fetching wedding data:", error);
    return defaultData;
  }
}

export async function saveWeddingData(data: WeddingData): Promise<void> {
  let slotId = getEnvironmentDocId();

  // Safeguard: Never write to the official master documents
  if (slotId === OFFICIAL_DOC_ID || slotId === "wedding_data_official" || slotId === "wedding_data_veer_and_zara_template_2") {
    slotId = DEDICATED_SLOT_ID;
  }

  const payload: WeddingData = {
    ...data,
    lastUpdated: new Date().toISOString(),
    isRemix: true,
    remixSlotId: slotId,
    templateName: TEMPLATE_FIELD_NAME
  };

  const docRef = doc(db, "weddingConfig", slotId);
  await setDoc(docRef, payload);
}

export async function restoreOfficialMasterData(): Promise<WeddingData> {
  const currentSlotId = getEnvironmentDocId();
  const payload: WeddingData = {
    ...defaultData,
    lastUpdated: new Date().toISOString(),
    isRemix: true,
    remixSlotId: currentSlotId,
    templateName: TEMPLATE_FIELD_NAME
  };

  await setDoc(doc(db, "weddingConfig", currentSlotId), payload);
  return payload;
}

export async function submitRSVP(rsvpData: any): Promise<void> {
  const collectionName = getRsvpCollectionName();
  const rsvpCollection = collection(db, collectionName);
  await addDoc(rsvpCollection, {
    ...rsvpData,
    submittedAt: new Date().toISOString()
  });
}

export async function getRSVPs(): Promise<any[]> {
  try {
    const collectionName = getRsvpCollectionName();
    const rsvpCollection = collection(db, collectionName);
    const snapshot = await getDocs(rsvpCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return [];
  }
}
