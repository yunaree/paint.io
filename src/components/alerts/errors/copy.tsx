import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import React from 'react';

function CopyErrorAlert() {
    return (
        <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Copy Error</AlertTitle>
            <AlertDescription>
                There was an error copying the link. Please try again.
            </AlertDescription>
        </Alert>
    );
}

export default CopyErrorAlert;