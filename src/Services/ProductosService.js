import { SupabaseClient } from "@supabase/supabase-js";

export async function getProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select(`
      id,
      nombre,
      precio,
      stock,
      categorias:categorias_id ( nombre )
    `);

  if (error) {
    console.error('Error al obtener productos:', error.message);
    return [];
  }

  return data;
}
