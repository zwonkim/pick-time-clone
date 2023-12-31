import ConsumerIntro from "components/consumer/ConsumerIntro";
import ProviderIntro from "components/provider/ProviderIntro";
import { useLocation } from "react-router-dom";

export default function Intro() {
  const location = useLocation();
  return location.pathname === "/" ? <ProviderIntro /> : <ConsumerIntro />;
}
