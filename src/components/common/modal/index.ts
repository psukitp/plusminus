import { lazy } from "react";

export const RecordModal = lazy(() => import('./RecordModal'))

export type { NewRecord, IRecordModal } from "./types";