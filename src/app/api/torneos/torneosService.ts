import { TorneosContainer, TorneosData } from "@/app/types/torneos";
import axios from "axios";

export const torneosService = {
  async getTorneoInfo(id: string): Promise<TorneosContainer> {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/_Product/${id}`;
      console.log("URL de la API:", url);
      const response = await axios.get<TorneosContainer>(url, {
        headers: {
          //Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          "X-Parse-Application-Id": "RbSEcGPvPc9oL7WyRB27Lz1DRfDWB4AMZfvBZiQU",
          "X-Parse-REST-API-Key": "a3mFAADaTQdBG1MtCV30BM4m5nnwycwHKRS0jN0M",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error en torneosService.getTorneoInfo:", error);
      throw error;
    }
  },

  async updateTorneoComponents(
    torneoId: string,
    componentes: TorneosData[]
  ): Promise<any> {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/_Product/${torneoId}`;
      const response = await axios.put<any>(
        url,
        { cas_contenido_pantalla: componentes },
        {
          headers: {
            //Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            "X-Parse-Application-Id":
              "RbSEcGPvPc9oL7WyRB27Lz1DRfDWB4AMZfvBZiQU",
            "X-Parse-REST-API-Key": "a3mFAADaTQdBG1MtCV30BM4m5nnwycwHKRS0jN0M",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error en torneosService.getTorneoInfo:", error);
      throw error;
    }
  },
};
