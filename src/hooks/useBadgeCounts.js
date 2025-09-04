import { useState, useEffect } from 'react';
import axios from 'axios';

const useBadgeCounts = () => {
  const [badgeCounts, setBadgeCounts] = useState({
    testimonials: 0,
    newsletter: 0,
    contact: 0,
    interest: 0
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBadgeCounts = async () => {
      try {
        const [testimonialsRes, newsletterRes, contactRes, interestRes] = await Promise.all([
          axios.get(`${API_URL}/admin/testimonials/`),
          axios.get(`${API_URL}/newsletter/`),
          axios.get(`${API_URL}/contact/`),
          axios.get(`${API_URL}/inquiry/`)
        ]);

        // Count pending testimonials
        const pendingTestimonials = testimonialsRes.data.filter(t => t.approval_status === 'pending').length;
        
        // Count new entries (assuming they have created_at field and we want recent ones)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const newNewsletter = newsletterRes.data.filter(item => 
          new Date(item.created_at || item.date) > oneWeekAgo
        ).length;

        const newContact = contactRes.data.filter(item => 
          new Date(item.created_at || item.date) > oneWeekAgo
        ).length;

        const newInterest = interestRes.data.filter(item => 
          new Date(item.created_at || item.date) > oneWeekAgo
        ).length;

        setBadgeCounts({
          testimonials: pendingTestimonials,
          newsletter: newNewsletter,
          contact: newContact,
          interest: newInterest
        });
      } catch (error) {
        console.error('Error fetching badge counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadgeCounts();
    
    // Refresh badge counts every 30 seconds
    const interval = setInterval(fetchBadgeCounts, 30000);
    
    return () => clearInterval(interval);
  }, [API_URL]);

  return { badgeCounts, loading };
};

export default useBadgeCounts;
