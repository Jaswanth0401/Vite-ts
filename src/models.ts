// models.ts
export interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
  selected: boolean;
  showSubDepartments: boolean; // Add this property to indicate if sub-departments are shown or hidden
}

export interface SubDepartment {
  id: number;
  name: string;
  selected: boolean;
}
