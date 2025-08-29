import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex gap-3 items-center">
      <Search />
      <Input placeholder="Search..." />
    </div>
  );
}
