import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function Page() {
  return (
    <Suspense fallback={<div className=""><Loader/></div>}>
      <SearchContent />
    </Suspense>
  );
}
 const Loader =()=>{
    return(
        <>
        <div className="h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fbfbfb]/70">
        <div className="rounded-full w-12 h-12 border-4 border-[#137a78] border-t-transparent animate-spin" />
      </div>
    </div>
        </>
    )
 }