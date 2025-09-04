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
        // Only fetch if API_URL is available
        if (!API_URL) {
          console.warn('API_URL not available');
          setLoading(false);
          return;
        }

        const [testimonialsRes, newsletterRes, contactRes, interestRes] = await Promise.allSettled([
          axios.get(`${API_URL}/admin/testimonials/`),
          axios.get(`${API_URL}/newsletter/`),
          axios.get(`${API_URL}/contact/`),
          axios.get(`${API_URL}/inquiry/`)
        ]);

        // Count pending testimonials
        let pendingTestimonials = 0;
        if (testimonialsRes.status === 'fulfilled' && testimonialsRes.value.data) {
          pendingTestimonials = testimonialsRes.value.data.filter(t => t.approval_status === 'pending').length;
        }
        
        // Count new entries (assuming they have created_at field and we want recent ones)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        let newNewsletter = 0;
        if (newsletterRes.status === 'fulfilled' && newsletterRes.value.data) {
          newNewsletter = newsletterRes.value.data.filter(item => {
            const itemDate = new Date(item.created_at || item.date || item.submitted_at);
            return itemDate > oneWeekAgo;
          }).length;
        }

        let newContact = 0;
        if (contactRes.status === 'fulfilled' && contactRes.value.data) {
          newContact = contactRes.value.data.filter(item => {
            const itemDate = new Date(item.created_at || item.date || item.submitted_at);
            return itemDate > oneWeekAgo;
          }).length;
        }

        let newInterest = 0;
        if (interestRes.status === 'fulfilled' && interestRes.value.data) {
          newInterest = interestRes.value.data.filter(item => {
            const itemDate = new Date(item.created_at || item.date || item.submitted_at);
            return itemDate > oneWeekAgo;
          }).length;
        }

        setBadgeCounts({
          testimonials: pendingTestimonials,
          newsletter: newNewsletter,
          contact: newContact,
          interest: newInterest
        });
      } catch (error) {
        console.error('Error fetching badge counts:', error);
        // Set default values on error
        setBadgeCounts({
          testimonials: 0,
          newsletter: 0,
          contact: 0,
          interest: 0
        });
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
