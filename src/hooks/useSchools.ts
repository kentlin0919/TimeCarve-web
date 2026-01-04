import { useState, useEffect } from "react";

export interface School {
  code: string;
  name: string;
}

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    // 優先使用靜態 JSON 檔案，因為資料庫可能資料不全
    fetch("/schools.json")
      .then((res) => res.json())
      .then((jsonData: any[]) => {
        // Raw JSON has keys like "學年度", "代碼", "學校名稱", etc.
        // Also contains duplicates for different years.
        
        const uniqueSchools = new Map<string, School>();
        
        jsonData.forEach((item) => {
          const code = item["代碼"];
          const name = item["學校名稱"];
          
          if (code && name) {
            // Map keys ensures uniqueness by code
            // If deeper logic needed (e.g. prioritize latest year), could check item["學年度"]
            if (!uniqueSchools.has(code)) {
              uniqueSchools.set(code, { code, name });
            }
          }
        });

        setSchools(Array.from(uniqueSchools.values()));
      })
      .catch((err) => {
        console.error("Failed to load schools.json", err);
        setSchools([]);
      });
  }, []);

  return schools;
}
