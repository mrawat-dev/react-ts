import { Moment } from "moment";

export type Deal = {
  id: string;
  name: string;
  amount: number;
  stage: number;
  created_at: Moment
}

type DealResponse = {
  deals: Deal[];
};

export const fetchDeal = (url: string) =>
  fetch(url).then<DealResponse>((r) => r.json());