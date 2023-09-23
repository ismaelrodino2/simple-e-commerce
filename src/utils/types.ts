export type Post = {
  id: string;
  postPic: string;
  postPicKey: string;
  title: string;
  content: string;
  allowComments: boolean;
  createdAt: Date;
  authorId: string;
  categories: Array<Categories>;
  author: author;
};
type author = {
  avatarKey: string;
  avatarUrl: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
};
export type PostNoCat = {
  id: string;
  title: string;
  content: string;
  allowComments: boolean;
  createdAt: Date;
  authorId: string;
  postPic: string;
  postPicKey: string;
  categories: Array<Category>;
};

export type Categories = {
  assignedAt: Date;
  assignedBy: string;
  category: Category;
  categoryId: string;
  postId: string;
};

export type Category = {
  id: string;
  name: string;
};

export interface Database {
  public: {
    Tables: {
      Posts: {
        Row: {
          title: string;
          content: string;
          allowComments: boolean;
          authorId: string;
          postPic: string;
          id: string;
          createdAt: string;
        }; // The data expected to be returned from a "select" statement.
        Insert: {
          title: string;
          content: string;
          allowComments: boolean;
          authorId: string;
        }; // The data expected passed to an "insert" statement.
        Update: {
          title?: string;
          content?: string;
          allowComments?: boolean;
          authorId?: string;
        }; // The data expected passed to an "update" statement.
      };
      Users: {
        id: string;
        avatarUrl: string;
        avatarKey: string;
        email: string;
        name: string;
        updatedAt: Date;
        createdAt: Date;
      };
      Categories: {
        id: string;
        name: string;
      };
      CategoriesOnPosts: {
        postId: string; // relation scalar field (used in the `@relation` attribute above)
        categoryId: string; // relation scalar field (used in the `@relation` attribute above)
        assignedAt: Date;
        assignedBy: string;
      };
    };
  };
}

export type User = {
  id: string;
  avatarUrl?: string | null;
  avatarKey?: string | null;
  stripeId: string;
  email: string;
  name?: string | null;
  updateAt?: string;
  createdAt?: string;
};

export type Comments = {
  id: number;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  author: {
    id: string;
    avatarUrl?: string | null;
    avatarKey?: string | null;
    email: string;
    name: string;
    updatedAt: Date;
    createdAt: Date;
  };
};

export type CheckoutSessionData = {
  id: string;
  after_expiration: null;
  allow_promotion_codes: null;
  amount_subtotal: number;
  amount_total: number;
  billing_address_collection: null;
  cancel_url: string;
  client_reference_id: null;
  consent: null;
  consent_collection: null;
  created: number;
  currency: string;
  currency_conversion: null;
  custom_fields: [];
  custom_text: object;
  customer: string;
  customer_creation: null;
  customer_details: object;
  customer_email: null;
  expires_at: number;
  invoice: null;
  invoice_creation: null;
  livemode: boolean;
  locale: null;
  metadata: {
    [key: string]: string;
  };
  mode: "subscription";
  payment_intent: null;
  payment_link: null;
  payment_method_collection: "always";
  payment_method_options: null;
  payment_method_types: string[];
  payment_status: "unpaid";
  phone_number_collection: object;
  recovered_from: null;
  setup_intent: null;
  shipping_address_collection: null;
  shipping_cost: null;
  shipping_details: null;
  shipping_options: [];
  status: "expired";
  submit_type: null;
  subscription: null;
  success_url: string;
  total_details: object;
  url: null;
};

export type Cart = {
  id: string;
  object: string;
  active: boolean;
  attributes: any[];
  created: number;
  default_price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null | number;
    livemode: boolean;
    lookup_key: null;
    metadata: Record<string, any>;
    nickname: null;
    product: string;
    recurring: {
      aggregate_usage: null;
      interval: string;
      interval_count: number;
      trial_period_days: null;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: null;
    transform_quantity: null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  description: string;
  images: string[];
  livemode: boolean;
  metadata: Record<string, any>;
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
  unit?: number;
};
export type Cart2 = {
  id: string;
  object: string;
  active: boolean;
  attributes: any[];
  created: number;
  default_price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null | number;
    livemode: boolean;
    lookup_key: null;
    metadata: Record<string, any>;
    nickname: null;
    product: string;
    recurring: {
      aggregate_usage: null;
      interval: string;
      interval_count: number;
      trial_period_days: null;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: null;
    transform_quantity: null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  description: string;
  images: string[];
  livemode: boolean;
  metadata: Record<string, any>;
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
  unit: number;
};

export interface Product {
  unit?: number;
  id: string;
  object: string;
  active: boolean;
  attributes: any[]; // Replace 'any' with the appropriate type
  created: number;
  default_price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null | number;
    livemode: boolean;
    lookup_key: null;
    metadata: Record<string, any>; // Replace 'any' with the appropriate type
    nickname: null;
    product: string;
    recurring: {
      aggregate_usage: null;
      interval: string;
      interval_count: number;
      trial_period_days: null;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: null;
    transform_quantity: null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  description: string;
  images: string[];
  livemode: boolean;
  metadata: Record<string, any>; // Replace 'any' with the appropriate type
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
}

export type Products = Array<Product>;
