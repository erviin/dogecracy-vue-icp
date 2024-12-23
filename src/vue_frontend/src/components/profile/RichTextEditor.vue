<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3';
import Button from '../ui/button/Button.vue';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, List, ListOrdered, UnderlineIcon } from 'lucide-vue-next';

const props = defineProps(['content', 'onChange'])

const editor = useEditor({
    extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
            protocols: ['http', 'https'],
            isAllowedUri: (url, ctx) => {
                try {
                    // construct URL
                    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                    // use default validation
                    if (!ctx.defaultValidate(parsedUrl.href)) {
                        return false
                    }

                    // disallowed protocols
                    const disallowedProtocols = ['ftp', 'file', 'mailto']
                    const protocol = parsedUrl.protocol.replace(':', '')

                    if (disallowedProtocols.includes(protocol)) {
                        return false
                    }

                    // only allow protocols specified in ctx.protocols
                    const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                    if (!allowedProtocols.includes(protocol)) {
                        return false
                    }

                    // disallowed domains
                    const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                    const domain = parsedUrl.hostname

                    if (disallowedDomains.includes(domain)) {
                        return false
                    }

                    // all checks have passed
                    return true
                } catch (error) {
                    console.log("errr", error)
                    return false
                }
            },
            shouldAutoLink: url => {
                try {
                    // construct URL
                    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                    // only auto-link if the domain is not in the disallowed list
                    const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                    const domain = parsedUrl.hostname

                    return !disallowedDomains.includes(domain)
                } catch (error) {
                    return false
                }
            },

        }),
    ],
    content: props.content,

    onUpdate: ({ editor }) => {
        props.onChange(editor.getHTML())
    },
})
</script>

<template>
    <div class="border border-black rounded-md p-2 flex-1 flex flex-col overflow-hidden bg-brand-white  h-full">
        <div class="flex flex-wrap gap-2 mb-2 border-b border-black pb-2">
            <Button variant="outline" size="icon" type="button"
                @click="() => editor?.chain().focus().toggleBold().run()"
                :class="editor?.isActive('bold') ? 'bg-muted' : ''">
                <Bold class="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" @click="() => editor?.chain().focus().toggleItalic().run()"
                :class="editor?.isActive('italic') ? 'bg-muted' : ''">
                <Italic class="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" @click="() => editor?.chain().focus().toggleUnderline().run()"
                :class="editor?.isActive('underline') ? 'bg-muted' : ''">
                <UnderlineIcon class="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon"
                @click="() => editor?.chain().focus().toggleBulletList().run()"
                :class="editor?.isActive('bulletList') ? 'bg-muted' : ''">
                <List class="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon"
                @click="() => editor?.chain().focus().toggleOrderedList().run()"
                :class="editor?.isActive('orderedList') ? 'bg-muted' : ''">
                <ListOrdered class="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" @click="() => editor?.chain().focus().setTextAlign('left').run()"
                :class="editor?.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''">
                <AlignLeft class="h-4 w-4" />
            </Button>
            <Button variant="outline" type="button" size="icon"
                @click="() => editor?.chain().focus().setTextAlign('center').run()"
                :class="editor?.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''">
                <AlignCenter class="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" @click="() => editor?.chain().focus().setTextAlign('right').run()"
                :class="editor?.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''">
                <AlignRight class="h-4 w-4" />
            </Button>
        </div>
        <div class='overflow-y-auto flex-1'>
            <EditorContent :editor="editor" class="h-full text-black p-2  max-w-none border-none " />
        </div>
    </div>
</template>