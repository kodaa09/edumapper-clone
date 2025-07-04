export function useSchool() {
  const config = useRuntimeConfig();

  async function index() {
    const schools = await $fetch<SchoolsResponse>(
      `${config.public.apiBase}/schools`
    );

    if (schools) return schools;
  }

  return {
    index,
  };
}

export type SchoolsResponse = {
  message: string;
  data: School[];
  status: string;
};

export type School = {
  id: number;
  name: string;
  city: string;
  type: string;
};
