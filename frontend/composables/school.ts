export function useSchool() {
  const config = useRuntimeConfig();

  async function index() {
    const schools = await $fetch<SchoolsResponse>(
      `${config.public.apiBase}/schools`
    );

    if (schools) return schools;
  }

  async function show(id: number) {
    const school = await $fetch<SchoolResponse>(
      `${config.public.apiBase}/schools/${id}`
    );

    if (school) return school;
  }

  return {
    index,
    show,
  };
}

export type SchoolsResponse = {
  message: string;
  data: School[];
  status: string;
};

export type SchoolResponse = {
  message: string;
  data: School;
  status: string;
};

export type School = {
  id: number;
  name: string;
  city: string;
  type: string;
};
