import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function ShareErrorAlert() {
    const t  = useTranslations('alerts.share_error')
    
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{t("title")}</AlertTitle>
            <AlertDescription>
                {t("description")}
            </AlertDescription>
        </Alert>
    );
}

export default ShareErrorAlert;