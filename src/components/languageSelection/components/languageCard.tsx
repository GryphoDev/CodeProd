import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "../../ui/checkbox";
import { getCodeExcerpt } from "@/utils/getCodeExcerpt";
import { useHandleCheckBox } from "../utils/handleCheckBox";

export function LanguageCard({ lang }: { lang: string }) {
  const handleCheckBox = useHandleCheckBox();

  return (
    <Card key={lang} className="w-60 justify-between">
      <CardHeader>
        <div className="flex justify-between items-center gap-5">
          <CardTitle>{lang}</CardTitle>
          <Checkbox
            onCheckedChange={(checked) => handleCheckBox(lang, checked)}
          />
        </div>
        <CardContent
          className="pt-4 text-[12px]"
          dangerouslySetInnerHTML={{
            __html: getCodeExcerpt(lang),
          }}
        ></CardContent>
      </CardHeader>
    </Card>
  );
}
