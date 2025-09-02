import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2Icon } from 'lucide-react';

function AddCommentSuccessAlert() {
    return (
        <Alert variant="default">
            <CheckCircle2Icon />
            <AlertTitle>Your comment now on board</AlertTitle>
            <AlertDescription>
                Thank you for your feedback!
            </AlertDescription>
        </Alert>
    );
}

export default AddCommentSuccessAlert;