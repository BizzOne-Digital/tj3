import type {
  ApiResponse,
  BookingSubmission,
  ContactSubmission,
  CrudResource,
  Facility,
  FaqItem,
  NewsArticle,
  PageContent,
  PricingTier,
  Service,
  ShopProduct,
  SiteSettings,
  Sponsor,
  StatItem,
  TeamMember,
} from "@/types/cms";
import { getSiteUrl } from "./utils";

async function serverFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getSiteUrl();
  const res = await fetch(`${base}${path}`, {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Request failed");
  return json;
}

async function clientFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Request failed");
  return json;
}

function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  if (typeof window === "undefined") {
    return serverFetch<T>(`/api/v1${path}`, init);
  }
  return clientFetch<T>(`/api/v1${path}`, init);
}

export const api = {
  getSettings: () => fetchApi<ApiResponse<SiteSettings>>("/settings"),
  getStats: () => fetchApi<ApiResponse<StatItem[]>>("/stats"),
  getFacilities: () => fetchApi<ApiResponse<Facility[]>>("/facilities"),
  getServices: () => fetchApi<ApiResponse<Service[]>>("/services"),
  getPricing: () => fetchApi<ApiResponse<PricingTier[]>>("/pricing"),
  getTeam: () => fetchApi<ApiResponse<TeamMember[]>>("/team"),
  getFaq: () => fetchApi<ApiResponse<FaqItem[]>>("/faq"),
  getNews: (params?: { limit?: number; page?: number; q?: string }) => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set("limit", String(params.limit));
    if (params?.page) qs.set("page", String(params.page));
    if (params?.q) qs.set("q", params.q);
    const query = qs.toString();
    return fetchApi<ApiResponse<NewsArticle[]>>(`/news${query ? `?${query}` : ""}`);
  },
  getNewsBySlug: (slug: string) =>
    fetchApi<ApiResponse<NewsArticle>>(`/news/${slug}`),
  getShop: () => fetchApi<ApiResponse<ShopProduct[]>>("/shop"),
  getProductBySlug: (slug: string) =>
    fetchApi<ApiResponse<ShopProduct>>(`/shop/${slug}`),
  getSponsors: () => fetchApi<ApiResponse<Sponsor[]>>("/sponsors"),
  getPage: (slug: string) => fetchApi<ApiResponse<PageContent>>(`/pages/${slug}`),
  submitContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) =>
    fetchApi<ApiResponse<ContactSubmission>>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  submitBooking: (data: {
    name: string;
    email: string;
    phone: string;
    facility: string;
    date: string;
    timeSlot: string;
    notes?: string;
  }) =>
    fetchApi<ApiResponse<BookingSubmission>>("/booking", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  submitInquiry: (data: {
    type: "league" | "partner" | "founding_member";
    name: string;
    email: string;
    organization?: string;
    payload: Record<string, unknown>;
  }) =>
    fetchApi<ApiResponse<{ _id: string; message: string }>>("/inquiry", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export const adminApi = {
  list: <T>(resource: CrudResource, params?: { limit?: number; page?: number }) => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set("limit", String(params.limit));
    if (params?.page) qs.set("page", String(params.page));
    const query = qs.toString();
    return fetchApi<ApiResponse<T[]> & { total: number }>(
      `/admin/${resource}${query ? `?${query}` : ""}`,
    );
  },
  create: <T>(resource: CrudResource, payload: Partial<T>) =>
    fetchApi<ApiResponse<T>>(`/admin/${resource}`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: <T>(resource: CrudResource, id: string, payload: Partial<T>) =>
    fetchApi<ApiResponse<T>>(`/admin/${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  delete: (resource: CrudResource, id: string) =>
    fetchApi<ApiResponse<{ deleted: boolean }>>(`/admin/${resource}/${id}`, {
      method: "DELETE",
    }),
  updateSettings: (payload: Partial<SiteSettings>) =>
    fetchApi<ApiResponse<SiteSettings>>("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};

export const authApi = {
  login: (data: { email: string; password: string }) =>
    fetchApi<ApiResponse<{ email: string; name: string; role: string }>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logout: () =>
    fetchApi<ApiResponse<{ ok: boolean }>>("/auth/logout", { method: "POST" }),
  me: () =>
    fetchApi<ApiResponse<{ _id: string; email: string; name: string; role: string }>>(
      "/auth/me",
    ),
};
