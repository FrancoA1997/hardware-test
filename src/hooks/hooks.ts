import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      router.push(`?${new URLSearchParams({
                  ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
                  name: value, // Dynamically update the current query param
                }).toString()}`)
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value,delay]);

return debouncedValue
};
