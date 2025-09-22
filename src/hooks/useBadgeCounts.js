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
    const asArray = (data) => (Array.isArray(data) ? data : (data?.results || []));

    const fetchBadgeCounts = async () => {
      try {
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

        let pendingTestimonials = 0;
        if (testimonialsRes.status === 'fulfilled' && testimonialsRes.value.data) {
          const list = asArray(testimonialsRes.value.data);
          pendingTestimonials = list.filter(t => t.approval_status === 'pending').length;
        }
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        let newNewsletter = 0;
        if (newsletterRes.status === 'fulfilled' && newsletterRes.value.data) {
          const list = asArray(newsletterRes.value.data);
          newNewsletter = list.filter(item => {
            const itemDate = new Date(item.created_at || item.date || item.submitted_at);
            return itemDate > oneWeekAgo;
          }).length;
        }

        let newContact = 0;
        if (contactRes.status === 'fulfilled' && contactRes.value.data) {
          const list = asArray(contactRes.value.data);
          newContact = list.filter(item => {
            const itemDate = new Date(item.created_at || item.date || item.submitted_at);
            return itemDate > oneWeekAgo;
          }).length;
        }

        let newInterest = 0;
        if (interestRes.status === 'fulfilled' && interestRes.value.data) {
          const list = asArray(interestRes.value.data);
          newInterest = list.filter(item => {
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
    const interval = setInterval(fetchBadgeCounts, 30000);
    return () => clearInterval(interval);
  }, [API_URL]);

  return { badgeCounts, loading };
};

export default useBadgeCounts;
