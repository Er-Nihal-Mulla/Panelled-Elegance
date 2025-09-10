// src/lib/firebase/actions.ts
'use server';
import { collection, addDoc, getDocs, Timestamp, query, orderBy, limit } from 'firebase/firestore';
import { db } from './config';
import mockData from '@/lib/placeholder-images.json';
import { isFirebaseEnabled } from './config';

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Enquiry = {
  name: string;
  email: string;
  message: string;
  phone: string;
};

/**
 * Fetches portfolio projects. If Firebase is configured, it fetches from Firestore.
 * Otherwise, it returns mock data.
 * @returns {Promise<Project[]>} - A list of portfolio projects.
 */
export async function getPortfolioProjects(): Promise<Project[]> {
  if (!isFirebaseEnabled()) {
    console.log('Firebase is not configured. Returning mock data for portfolio.');
    return mockData.projects as Project[];
  }

  try {
    const projectsCollection = collection(db, 'portfolio');
    const q = query(projectsCollection, orderBy('title', 'desc'), limit(6));
    const projectSnapshot = await getDocs(q);
    const projectList = projectSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    return projectList;
  } catch (error) {
    console.error("Error fetching portfolio from Firestore:", error);
    // Fallback to mock data in case of Firestore error
    return mockData.projects as Project[];
  }
}

/**
 * Adds a new enquiry to the Firestore 'enquiries' collection.
 * This function should only be called if isFirebaseEnabled() is true.
 * @param {Enquiry} enquiryData - The enquiry data to add.
 * @returns {Promise<void>}
 */
export async function addEnquiry(enquiryData: Enquiry): Promise<void> {
  if (!isFirebaseEnabled()) {
    console.warn('Firebase not configured. Skipping addEnquiry.');
    return;
  }
  
  try {
    await addDoc(collection(db, 'enquiries'), {
      ...enquiryData,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error adding enquiry to Firestore:", error);
    throw new Error('Could not save enquiry to the database.');
  }
}
