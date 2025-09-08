'use client'

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ArrowDownUp, Check, Copy, ExternalLinkIcon, Loader2, Plus, Share2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useAlert } from '../providers/provider';
import Alert from '../alerts';
import { ShareButton } from '../buttons/share-button';

function CreateBoard() {
    const { showAlert } = useAlert()
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false) 
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const t  = useTranslations('forms.create_board')

    const createBoard = async () => {
        setIsLoading(true)

        const { data, error } = await supabase
        .from('boards')
        .insert([{ owner_name: name }])
        .select()
        .single()

        if(error) {
            setErrorMessage(error.message)
            setIsLoading(false)
            return
        }

        if (data) {
            const boardUrl = `${process.env.NEXT_PUBLIC_URL}/board/${data.id}`
            setUrl(boardUrl)
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createBoard();
    };

    useEffect(() => {
        if (url && inputRef.current) {
            inputRef.current.select();
        }
    }, [url]);

    const handleCopy = async () => {
        if (!url) return;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); 
            showAlert(<Alert.CopySuccess />);
        } catch (err) {
            showAlert(<Alert.CopyError />);
        }
    };

    const handleOpenURL = () => {
        if (url) {
            router.push(url)
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                {errorMessage && <CardDescription className="text-red-500">{errorMessage}</CardDescription>}
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className='flex py-4 gap-1'>
                            <Input
                                className=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t("input_placeholder")}
                            />

                            <Button variant="default" type="submit" disabled={isLoading}>{
                                    isLoading ? <Loader2 className='animate-spin' /> : <ArrowDownUp/>
                                }</Button>
                        </div>
                    </form>

                    <Separator/>

                    <div className='text-sm text-center text-gray-500'>
                        <Input
                            className="my-4"
                            value={url}
                            readOnly
                            disabled={!url}
                            placeholder={t("url_placeholder")}
                        />

                        <div className='flex gap-2'>
                            <Button variant="outline" disabled={!url} onClick={handleCopy}>
                                {copied ? <Check/> : <Copy/>}
                            </Button>
                            {/* <Button variant="outline" disabled={!url}><Share2/></Button> */}
                            <ShareButton url={url} />
                            <Button variant="default" className='flex-1' disabled={!url} onClick={handleOpenURL}><ExternalLinkIcon/> {t('open_button')}</Button>
                        </div>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    );
}

export default CreateBoard;