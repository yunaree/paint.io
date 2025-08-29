'use client'

import React from 'react';
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { ArrowDownUp, Copy, ExternalLinkIcon, Loader2, Plus, Share2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

function CreateBoard() {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const t  = useTranslations('pages.home')

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
                            <Button variant="outline" disabled={!url}><Copy/></Button>
                            <Button variant="outline" disabled={!url}><Share2/></Button>
                            <Button variant="default" className='flex-1' disabled={!url}><ExternalLinkIcon/> {t('open_button')}</Button>
                        </div>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    );
}

export default CreateBoard;