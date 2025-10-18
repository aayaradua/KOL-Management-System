import api from "../hooks/axios";

export const getKols = async () => {
  const res = await api.get("/kol/all");
  return res.data;
};

export const getKolById = async (id) => {
  const res = await api.get(`/kol/${id}`);
  return res.data;
};
