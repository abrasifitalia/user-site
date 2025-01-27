
import axios from 'axios';

export const handleOrder = async (clientId, articleId, articleQuantity,Category, SubCategory, setIsSubmitting, navigate , setModalState) => {
    if (articleQuantity <= 0) {
      setModalState({
        show: true,
        title: "Problème",
        message: "La quantité doit être supérieure à 0.",
        variant: "danger",
        route: "article"
      });
      return;
    }

    if (!clientId) {
      const redirectPath = `/articles/${Category}/${SubCategory}/${articleId}`;
      navigate(`/login?redirectPath=${encodeURIComponent(redirectPath)}`);
    }

    const orderData = {
      clientId,
      items: [{ articleId: articleId, quantity: parseInt(articleQuantity, 10) }],
    };

    setIsSubmitting(true);
    try {
       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/order/order`, orderData);
      setModalState({
        show: true,
        title: "Succès",
        message: "Demande de devis envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.",
        variant: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la commande :", error.response?.data || error.message);
      setModalState({
        show: true,
        title: "Erreur",
        message: "Un problème est survenue lors de l'envoi de la demande de devis. Veuillez réessayer plus tard.",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };