import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

function CopyErrorAlert() {
    const t  = useTranslations('alerts.copy_error')
    
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

export default CopyErrorAlert;