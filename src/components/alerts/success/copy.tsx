import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2Icon } from 'lucide-react';

function CopySuccessAlert() {
    return (
        <Alert variant="default">
            <CheckCircle2Icon />
            <AlertTitle>Success! Your link have been copied</AlertTitle>
            <AlertDescription>
                Now you can share it with your friends and start collaborating!
            </AlertDescription>
        </Alert>
    );
}

export default CopySuccessAlert;