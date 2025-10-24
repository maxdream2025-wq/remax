import React from 'react';
import Head from 'next/head';

const MetaData = ({ 
  title = "RE/MAX UAE - Leading Real Estate Company",
  description = "RE/MAX the leading real estate company in UAE offers properties for sale and rent. And for successful business join our real estate agents or own a franchise",
  image = "https://remax.ae/assets/img/brandlogo/remax_logo.svg",
  url = "https://remax.ae",
  type = "website"
}) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="RE/MAX UAE" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="keywords" content="real estate, properties, UAE, Dubai, RE/MAX, agents, franchise" />
      <meta name="author" content="RE/MAX UAE" />
      <meta name="robots" content="index, follow" />
      
      {/* Favicon */}
      <link rel="icon" href="/assets/fav.png" />
    </Head>
  );
};

export default MetaData;
