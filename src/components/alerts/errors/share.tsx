import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

function ShareErrorAlert() {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Share error</AlertTitle>
            <AlertDescription>
                There was an error sharing the link. Please try again.
            </AlertDescription>
        </Alert>
    );
}

export default ShareErrorAlert;