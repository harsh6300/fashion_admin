import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

const PrefetchLink = ({ to, prefetchActions = [], className, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const actions = Array.isArray(prefetchActions)
        ? prefetchActions
        : [prefetchActions];

      // Wait for all API calls to complete
      await Promise.all(actions.map((action) => dispatch(action).unwrap()));

      navigate(to);
    } catch (err) {
      console.error("Prefetch failed:", err);
      navigate(to); // optional fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default PrefetchLink;
