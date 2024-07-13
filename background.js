chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
  });
  
  chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.includes("youtube.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['inject.js']
      });
    }
  });
  