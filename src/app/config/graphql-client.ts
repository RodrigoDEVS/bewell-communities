// Cliente GraphQL mejorado con mejor manejo de errores
const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

interface GraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: string[];
  extensions?: {
    code?: string;
    stacktrace?: string[];
  };
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export class GraphQLClientError extends Error {
  originalError?: any;
  httpStatus?: number;
  graphqlErrors?: GraphQLError[];

  constructor(
    message: string,
    options?: {
      originalError?: any;
      httpStatus?: number;
      graphqlErrors?: GraphQLError[];
    }
  ) {
    super(message);
    this.name = "GraphQLClientError";
    this.originalError = options?.originalError;
    this.httpStatus = options?.httpStatus;
    this.graphqlErrors = options?.graphqlErrors;
    // Esto asegura que la pila de llamadas sea correcta en V8 (Chrome y Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLClientError);
    }
  }
}

export const graphqlClient = {
  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    console.log("🚀 GraphQL Query:", {
      query: query.trim(),
      variables,
      url: GRAPHQL_API_URL,
    });

    if (!GRAPHQL_API_URL) {
      throw new GraphQLClientError(
        "NEXT_PUBLIC_GRAPHQL_API_URL no está configurada"
      );
    }

    try {
      const response = await fetch(GRAPHQL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ HTTP Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new GraphQLClientError(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const json: GraphQLResponse<T> = await response.json();
      console.log("📦 GraphQL Response:", json);

      // GraphQL devuelve errores en la respuesta incluso con status 200
      if (json.errors) {
        console.error("❌ GraphQL Errors:", json.errors);

        // Crear un error más detallado
        const errorMessages = json.errors.map((error) => {
          let message = error.message;
          if (error.path) {
            message += ` (Path: ${error.path.join(".")})`;
          }
          if (error.locations) {
            message += ` (Line: ${error.locations[0]?.line}, Column: ${error.locations[0]?.column})`;
          }
          return message;
        });

        throw new GraphQLClientError(
          `GraphQL Error: ${errorMessages.join("\n")}`
        );
      }

      if (!json.data) {
        throw new GraphQLClientError("No data returned from GraphQL query");
      }

      return json.data;
    } catch (error) {
      console.error("💥 GraphQL Client Error:", error);
      if (error instanceof GraphQLClientError) {
        throw error;
      }
      throw new GraphQLClientError("Network or unexpected error", {
        originalError: error,
      });
    }
  },
};

// Hook para obtener un cliente GraphQL autenticado (para futuras implementaciones)
export function useAuthenticatedGraphQLClient() {
  // Aquí puedes añadir lógica para incluir tokens de autenticación
  return graphqlClient;
}
