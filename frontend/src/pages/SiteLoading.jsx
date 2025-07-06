import { PulseLoader } from "react-spinners";
import { useEffect } from "react";

const SiteLoading = ({ loading }) => {
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [loading]);

  if (!loading) return null; // Don't render if not loading

  return (
    <div>
      <div className="bg-[var(--primary)] flex justify-center items-center h-[100vh]">
        <div className="p-12 sm:p-16 rounded-3xl shadow-md bg-[var(--bg)] flex flex-col gap-6 items-center justify-center">
          <PulseLoader
            color="var(--accent)"
            // cssOverride={{ borderRadius: '8px' }}
            size={20}
            loading
          />
          <div>
            <p>Starting up the server…</p>
            <p>Please wait a moment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLoading;
