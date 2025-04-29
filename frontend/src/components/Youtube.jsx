import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";

const YouTubeSlider = () => {
  const [videos, setVideos] = useState([]);
  const [language, setLanguage] = useState("en");

  const getLocalizedQuery = (langCode) => {
    switch (langCode) {
      case "hi":
        return "किसान शिक्षा, कृषि योजनाएं, सरकारी योजनाएं, फसल अध्ययन, कृषि कचरा, मंडी कीमतें";
      case "bn":
        return "কৃষক শিক্ষা, কৃষি প্রকল্প, সরকারী প্রকল্প, ফসল গবেষণা, কৃষি বর্জ্য, বাজার মূল্য";
      case "te":
        return "రైతు విద్య, వ్యవసాయ పథకాలు, ప్రభుత్వ పథకాలు, పంటల అధ్యయనం, వ్యవసాయ వ్యర్థాలు, మార్కెట్ ధరలు";
      case "ta":
        return "விவசாய கல்வி, விவசாய திட்டங்கள், அரசு உதவித் திட்டங்கள், பயிர் ஆய்வு, வேளாண் கழிவுகள், சந்தை விலை";
      case "en":
      default:
        return "farmer education, agriculture schemes, government schemes for farmers, crop study, agricultural waste, mandi prices";
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const searchQuery = getLocalizedQuery(language);
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              key: process.env.REACT_APP_YOUTUBE_API_KEY,
              part: "snippet",
              maxResults: 10,
              q: searchQuery,
              type: "video",
              relevanceLanguage: language,
              safeSearch: "strict"
            }
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <label htmlFor="language" className="mr-2 text-sm font-medium">Choose Language:</label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="te">Telugu</option>
          <option value="ta">Tamil</option>
        </select>
      </div>

      {/* Responsive Grid of Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">{video.snippet.title}</h3>
            <YouTube
              videoId={video.id.videoId}
              opts={{
                width: "100%",
                height: "250",
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                  rel: 0,
                }
              }}
            />
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {video.snippet.description.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSlider;
