export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getDiscountPercent(original, current) {
  if (!original) return 0;
  return Math.round(((original - current) / original) * 100);
}

export function generateOrderId() {
  return "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function truncate(str, len = 80) {
  if (str.length <= len) return str;
  return str.substring(0, len) + "...";
}
