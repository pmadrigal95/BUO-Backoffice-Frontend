<script>
/**
 * Descripción: Convertir Html 2 Pdf
 *
 * @displayName BaseHtml2Pdf
 *
 * https://github.com/kempsteven/vue-html2pdf#html-to-pdf-options
 *
 * https://www.npmjs.com/package/vue-html2pdf
 */

import VueHtml2pdf from 'vue-html2pdf';

export default {
    name: 'BaseHtml2Pdf',

    props: {
        /**
         * show-layout
         * Boolean
         * Shows the pdf-content slot, using this you can see what contents will be converted to PDF.
         */
        showLayout: {
            type: Boolean,
            default: true,
        },

        /**
         * float-layout
         * Boolean
         * Enabled by default. If the props is set to false The props show-layout will be overridden.
         * The layout will not float and the layout will ALWAYS show.
         */
        floatLayout: {
            type: Boolean,
            default: false,
        },

        /**
         * enable-download
         * Boolean
         * Enabled by default. When enabled the pdf will be downloaded and vise-versa.
         */
        enableDownload: {
            type: Boolean,
            default: false,
        },

        /**
         * preview-modal
         * Boolean
         * Once you generate the pdf, PDF will be previewed on a modal, PDF will not be downloaded.
         */
        previewModal: {
            type: Boolean,
            default: true,
        },

        /**
         * paginate-elements-by-height
         * Number
         * The number inputed will be used to paginate elements, the number will be in px units only.
         */
        paginateElementsByHeight: {
            type: Number,
            default: undefined,
        },

        /**
         * manual-pagination
         * Boolean
         * When enabled, the package will NOT automatically paginate the elements.
         * Instead the pagination process will rely on the elements with a class "html2pdf__page-break"
         * to know where to page break, which is automatically done by html2pdf.js
         */
        manualPagination: {
            type: Boolean,
            default: true,
        },

        /**
         * filename
         * String
         * Filename output
         */
        filename: {
            type: String,
            required: true,
        },

        /**
         * pdf-quality
         * Number 0 - 2 (Can have decimal)
         * 2 is the highest quality and 0.1 is the lowest quality, 0 will make the PDF disappear.
         */
        pdfQuality: {
            type: Number,
            default: 2,
        },

        /**
         * pdf-format
         * String
         * a0, a1, a2, a3, a4, letter, legal, a5, a6, a7, a8, a9, a10
         *
         * This are the PDF formats (Paper Sizes)
         */
        pdfFormat: {
            type: String,
            default: 'a4',
        },

        /**
         * pdf-orientation
         * String
         * portrait, landscape
         *
         * This are the PDF orientation
         */
        pdfOrientation: {
            type: String,
            default: 'landscape',
        },

        /**
         * pdf-content-width
         * String, Number
         * Any css sizes (e.g. "800px", "65vw", "70%")
         *
         * This is the PDF's content width
         */
        pdfContentWidth: {
            type: [String, Number],
            default: '100%',
        },

        /**
         * html-to-pdf-options
         * Object
         * This prop gives a way to configure the whole html2pdf.js options
         *
         * {
         *  margin: 0 [ number or array ] => PDF margin (in jsPDF units). Can be a single number, [vMargin, hMargin], or [top, left, bottom, right].
         *  filename: 'file.pdf' [ string ] => The default filename of the exported PDF.
         *  image: {type: 'jpeg', quality: 0.95} [ Object ] => The image type and quality used to generate the PDF.
         *  enableLinks: false [ Boolean ] => If enabled, PDF hyperlinks are automatically added ontop of all anchor tags.
         *  html2canvas: {} [ Object ] => Configuration options sent directly to html2canvas
         *  jsPDF: {} [ Object ] => Configuration options sent directly to jsPDF
         * }
         *
         * If you have set a value to this prop, the props below will be overridden:
         *  'filename', 'pdf-quality', 'pdf-format', 'pdf-orientation'
         * Any value inputed to those props above will have no effect.
         * 
         * htmlToPdfOptions: {
                margin: 0,

                filename: `hehehe.pdf`,

                image: {
                    type: 'jpeg', 
                    quality: 0.98
                },

                enableLinks: false,

                html2canvas: {
                    scale: 1,
                    useCORS: true
                },

                jsPDF: {
                    unit: 'in',
                    format: 'a4',
                    orientation: 'portrait'
                }
            }
         */
        htmlToPdfOptions: {
            type: Object,
            default: undefined,
        },
    },

    components: {
        VueHtml2pdf,
    },

    methods: {
        /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
        generateReport() {
            this.$refs.html2Pdf.generatePdf();
        },

        onProgress(event) {
            console.log(event);
        },

        // @beforeDownload="beforeDownload($event)"
        async beforeDownload({ html2pdf, options, pdfContent }) {
            await html2pdf()
                .set(options)
                .from(pdfContent)
                .toPdf()
                .get('pdf')
                .then((pdf) => {
                    const totalPages = pdf.internal.getNumberOfPages();
                    for (let i = 1; i <= totalPages; i++) {
                        pdf.setPage(i);
                        pdf.setFontSize(10);
                        pdf.setTextColor(150);
                        pdf.text(
                            'Page ' + i + ' of ' + totalPages,
                            pdf.internal.pageSize.getWidth() * 0.88,
                            pdf.internal.pageSize.getHeight() - 0.3
                        );
                    }
                })
                .save();
        },
    },
};
</script>

<template>
    <section>
        <v-layout justify-end align-center>
            <button @click="generateReport">Hola</button>
        </v-layout>
        <vue-html2pdf
            :show-layout="showLayout"
            :float-layout="floatLayout"
            :enable-download="enableDownload"
            :preview-modal="previewModal"
            :paginate-elements-by-height="paginateElementsByHeight"
            :manual-pagination="manualPagination"
            :filename="filename"
            :pdf-quality="pdfQuality"
            :pdf-format="pdfFormat"
            :pdf-orientation="pdfOrientation"
            :pdf-content-width="pdfContentWidth"
            :html-to-pdf-options="htmlToPdfOptions"
            @progress="onProgress($event)"
            ref="html2Pdf"
        >
            <section slot="pdf-content">
                <!-- Examples -->
                <!-- Page Break -->
                <!-- <section slot="pdf-content">
                    <section class="pdf-item">
                        <h4>Title</h4>

                        <span> Value </span>
                    </section> -->

                <!--
                        After this element below, the page will break and any elements after
                        <div class="html2pdf__page-break"/> will go to the next page.
                    -->
                <!-- <div class="html2pdf__page-break" />

                    <section class="pdf-item">
                        <h4>Title</h4>

                        <span> Value </span>
                    </section>
                </section> -->

                <!-- Guide -->
                <!-- <section slot="pdf-content"> -->
                <!--
                    Divide your content into section, this pdf-item will
                    be the element that it's content will not be separated
                    in the paginating process. ex. <h4> and <span> wont be separated.
                -->
                <!-- <section class="pdf-item">
                        <h4>Title</h4>

                        <span> Value </span>
                    </section> -->

                <!--
                    All other pdf-item will be separated in the pagination process,
                    depending on paginate-elements-by-height prop.
                -->
                <!-- <section class="pdf-item">
                        <h4>Title</h4>

                        <span> Value </span>
                    </section> -->

                <!--
                    If you have any image with a remote source
                    set html2canvas.useCORS to true, although it is set to true by default
                    Ex.
                    html2canvas: {
                        useCORS: true
                    }
                -->
                <!-- <section class="pdf-item">
                        <img :src="remoteImageLink" />
                    </section>
                </section> -->

                <slot name="Content"></slot>
                <!-- PDF Content Here -->
            </section>
        </vue-html2pdf>
    </section>
</template>
