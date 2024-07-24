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

const API_URL = `https://cms.parallelchain.io`;
const API_NAME = 'employees';
const CONFIG = {
  priority_sorting: '_sort=priority:DESC',
};

export async function getAllEmployees() {
  const res = await fetch(`${API_URL}/${API_NAME}?${CONFIG.priority_sorting}`);
  const employees = await res.json();

  employees.forEach((employee: Employee) => {
    employee.photo.url = `${API_URL}/${employee.photo?.url}`;
    employee.position = employee.position.map((p: any) => p.line);
    employee.degree = employee.degree.map((p: any) => p.line);
  });

  return employees;
}
