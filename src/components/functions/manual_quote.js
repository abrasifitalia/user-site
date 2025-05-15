import axios from 'axios';

export const handleManualQuote = async (quoteData, setIsSubmitting, setModalState) => {
  setIsSubmitting(true);

  // Validate phone number format (Tunisian format)
  const phoneRegex = /^(\+216|216)?[0-9]{8}$/;
  if (!phoneRegex.test(quoteData.phone.replace(/\s/g, ''))) {
    setModalState({
      show: true,
      title: "Erreur de validation",
      message: "Le numéro de téléphone n'est pas valide. Veuillez utiliser un numéro tunisien valide.",
      variant: "danger"
    });
    setIsSubmitting(false);
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(quoteData.email)) {
    setModalState({
      show: true,
      title: "Erreur de validation",
      message: "L'adresse email n'est pas valide.",
      variant: "danger"
    });
    setIsSubmitting(false);
    return false;
  }

  try {
    const formattedData = {
      ...quoteData,
      phone: quoteData.phone.replace(/\s/g, ''), // Remove spaces from phone number
      quantity: parseInt(quoteData.quantity, 10)
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/quote/manual`,
      formattedData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      setModalState({
        show: true,
        title: "Succès",
        message: "Votre demande de devis a été envoyée avec succès. Nous vous contacterons bientôt!",
        variant: "success"
      });
      return true;
    }

  } catch (error) {
    console.error('Error submitting manual quote:', error);
    
    const errorMessage = error.response?.data?.message || 
      "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer plus tard.";
    
    setModalState({
      show: true,
      title: "Erreur",
      message: errorMessage,
      variant: "danger"
    });
    return false;
    
  } finally {
    setIsSubmitting(false);
  }
};
