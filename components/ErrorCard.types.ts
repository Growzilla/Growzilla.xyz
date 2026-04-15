export type ErrorEnvelope = {
  error: {
    id: string | null;
    code: string;
    message: string;
    file?: string | null;
    line?: number | null;
    shop_id?: string | null;
    trace_id?: string | null;
    path?: string | null;
    method?: string | null;
  };
};
