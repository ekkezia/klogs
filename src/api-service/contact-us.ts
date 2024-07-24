import { IContactForm } from '../components/template/about/contact-us/contact-us-form-formik.component';

/* eslint-disable import/prefer-default-export */
export interface Photo {
  name: string;
  url: string;
}

export interface Employee {
  id: string;
  name: string;
  type: string;
  linkedin: string;
  certification: string;
  funFact: string;
  description: string;
  photo: Photo;
  position: string[];
  degree: string[];
}

// const API_URL = `http://localhost:5050`;
const API_URL = `https://api.parallelchain.io`;
const API_NAME = 'lab-contact-us';

export async function sendContactForm(data: IContactForm) {
  const res = await fetch(`${API_URL}/${API_NAME}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}
