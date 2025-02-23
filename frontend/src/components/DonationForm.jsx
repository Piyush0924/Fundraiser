import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PaymentPage from "./PaymentForm";
import toast, { Toaster } from "react-hot-toast";

const DonationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    taxExemption: false,
    referenceCode: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);

  // Close when clicking outside the form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userToken) {
      toast.error("You must be logged in to donate.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/donations",
        formData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      toast.success("Donation submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        taxExemption: false,
        referenceCode: "",
        amount: "",
      });

      setTimeout(() => {
        onClose(); 
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast.error("Error submitting donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Toaster />
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
          <input type="email" placeholder="Email Address" className="w-full p-2 border rounded" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="tel" placeholder="Phone" className="w-full p-2 border rounded" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <input type="number" placeholder="Donation Amount" className="w-full p-2 border rounded" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
          <PaymentPage/>
            <button type="submit" className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600" disabled={loading}>
            {loading ? "Processing..." : "Submit & Pay"} 
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
