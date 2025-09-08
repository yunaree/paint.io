import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function CopySuccessAlert() {
    const t  = useTranslations('alerts.copy_success')
    
    return (
        <Alert variant="default">
            <CheckCircle2Icon />
            <AlertTitle>{t("title")}</AlertTitle>
            <AlertDescription>
                {t("description")}
            </AlertDescription>
        </Alert>
    );
}

export default CopySuccessAlert;