import CookieConsent from "react-cookie-consent";


export const CookieController = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="J'accepte"
      cookieName="userConsent"
      style={{ background: "#343a40", color: "#ffffff", borderRadius: "5px", padding: "10px" }}
  buttonStyle={{ color: "#ffffff", fontSize: "14px", backgroundColor: "#28a745", border: "none", borderRadius: "5px", padding: "8px 12px", cursor: "pointer" }}
  expires={365}
>
  Ce site utilise des cookies pour améliorer l'expérience utilisateur.{" "}
  <a href="/" style={{ color: "#ffd700", textDecoration: "underline" }}>En savoir plus</a>.
</CookieConsent>
  );
};
