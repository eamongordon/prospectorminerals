import Link from 'next/link';
import ThemeSwitch from "./theme-switch";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-900">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div>
                            <Link href="/">
                                <svg data-bbox="0 0 58.561 11.289" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 58.561 11.289" height="42.667" width="221.333" data-type="color">
                                    <g>
                                        <defs>
                                            <symbol id="c87b2d1f-afce-4567-b868-ab483c9c89ef" overflow="visible">
                                                <path d="M3.484-4.828V0H1.75v-12.89h3.797c.82 0 1.535.093 2.14.28.602.188 1.102.462 1.5.813.395.344.688.762.876 1.25a4.42 4.42 0 0 1 .296 1.64c0 .606-.105 1.157-.312 1.657-.211.5-.516.934-.922 1.297-.406.355-.914.633-1.516.828-.593.2-1.28.297-2.062.297zm0-1.375h2.063c.5 0 .937-.067 1.312-.203.383-.133.707-.317.97-.547.257-.238.452-.524.577-.86a2.91 2.91 0 0 0 .203-1.093c0-.82-.257-1.461-.765-1.922-.5-.457-1.266-.688-2.297-.688H3.484zm0 0" />
                                            </symbol>
                                            <symbol id="4d617dd5-e623-47ef-a2bc-5fd67b8ea487" overflow="visible">
                                                <path d="M3.484-5.375V0H1.75v-12.89h3.64c.813 0 1.516.085 2.11.25.594.156 1.082.39 1.469.703.394.312.68.695.86 1.14.187.438.28.93.28 1.469 0 .46-.074.887-.218 1.281a3.183 3.183 0 0 1-.625 1.078 3.69 3.69 0 0 1-1 .797 4.862 4.862 0 0 1-1.329.5c.22.125.41.309.579.547L11.28 0H9.734c-.324 0-.558-.125-.703-.375l-3.36-4.61a.905.905 0 0 0-.327-.296c-.117-.063-.293-.094-.532-.094zm0-1.281h1.829c.507 0 .957-.055 1.343-.172.383-.125.707-.297.969-.516a2.3 2.3 0 0 0 .594-.812c.133-.313.203-.66.203-1.047 0-.758-.258-1.332-.766-1.719-.511-.394-1.265-.594-2.265-.594H3.484zm0 0" />
                                            </symbol>
                                            <symbol id="79500da1-899c-42b8-9308-00a08412c44d" overflow="visible">
                                                <path d="M13.547-6.438c0 .961-.156 1.844-.469 2.657a6.004 6.004 0 0 1-1.297 2.078 5.681 5.681 0 0 1-2 1.36C9-.02 8.133.14 7.187.14c-.949 0-1.812-.16-2.593-.485a5.816 5.816 0 0 1-2.016-1.36A6.244 6.244 0 0 1 1.281-3.78C.977-4.594.828-5.477.828-6.437c0-.97.149-1.852.453-2.657a6.276 6.276 0 0 1 1.297-2.094 5.925 5.925 0 0 1 2.016-1.359c.781-.332 1.644-.5 2.593-.5.946 0 1.813.168 2.594.5a5.786 5.786 0 0 1 2 1.36 6.035 6.035 0 0 1 1.297 2.093c.313.805.469 1.688.469 2.656zm-1.797 0c0-.789-.11-1.5-.328-2.125-.211-.632-.512-1.171-.906-1.609a3.92 3.92 0 0 0-1.454-1 4.761 4.761 0 0 0-1.874-.36 4.8 4.8 0 0 0-1.891.36 3.894 3.894 0 0 0-1.438 1c-.398.438-.703.977-.921 1.61-.22.624-.329 1.335-.329 2.124 0 .793.11 1.5.329 2.125.218.625.523 1.157.921 1.594.395.438.875.774 1.438 1 .562.23 1.191.344 1.89.344.688 0 1.313-.113 1.875-.344a3.875 3.875 0 0 0 1.454-1 4.49 4.49 0 0 0 .906-1.594c.219-.625.328-1.332.328-2.125zm0 0" />
                                            </symbol>
                                            <symbol id="e9b7dd90-14e4-4e6a-8c15-9b614ee90a3b" overflow="visible">
                                                <path d="M8.172-10.875a.825.825 0 0 1-.172.203.404.404 0 0 1-.234.063c-.106 0-.227-.051-.36-.157a5.038 5.038 0 0 0-.515-.328 3.922 3.922 0 0 0-.735-.344 3.26 3.26 0 0 0-1.062-.156c-.387 0-.73.055-1.032.156a2.19 2.19 0 0 0-.765.438c-.2.18-.352.387-.453.625a2.19 2.19 0 0 0-.14.797c0 .355.085.652.265.89.176.243.41.446.703.61.289.168.617.312.984.437.375.118.754.243 1.14.375.384.137.759.29 1.126.454a4.12 4.12 0 0 1 1 .625c.289.25.523.558.703.921.176.368.266.813.266 1.344a4.38 4.38 0 0 1-.297 1.61 3.491 3.491 0 0 1-.844 1.28c-.367.368-.82.653-1.36.86-.53.207-1.14.313-1.827.313-.836 0-1.594-.149-2.282-.454A5.403 5.403 0 0 1 .516-1.53l.515-.828a.454.454 0 0 1 .172-.172.477.477 0 0 1 .234-.063c.125 0 .266.07.422.203.164.125.368.274.61.438.238.168.531.32.875.453.351.125.773.188 1.265.188.414 0 .786-.051 1.11-.157a2.39 2.39 0 0 0 .828-.484c.226-.207.398-.453.516-.734.125-.29.187-.614.187-.97 0-.394-.09-.718-.266-.968a2.226 2.226 0 0 0-.703-.625 5.41 5.41 0 0 0-.984-.422c-.367-.113-.746-.234-1.14-.36a14.778 14.778 0 0 1-1.141-.421 3.717 3.717 0 0 1-.985-.64 2.956 2.956 0 0 1-.687-.97c-.18-.382-.266-.863-.266-1.437 0-.445.086-.883.266-1.313a3.47 3.47 0 0 1 .765-1.14 3.853 3.853 0 0 1 1.25-.797 4.646 4.646 0 0 1 1.704-.297c.718 0 1.375.117 1.968.344.594.23 1.114.562 1.563 1zm0 0" />
                                            </symbol>
                                            <symbol id="cceea666-4c30-4e56-8c96-6d9b3b8f6c79" overflow="visible">
                                                <path d="M9.516-12.89v1.421H3.328v4.281h5v1.36h-5v4.406h6.188V0H1.562v-12.89zm0 0" />
                                            </symbol>
                                            <symbol id="d0b4bd97-762c-4a33-9573-8f378a95d99e" overflow="visible">
                                                <path d="M10.656-2.656c.094 0 .18.039.266.11l.672.75A5.41 5.41 0 0 1 9.672-.36c-.75.336-1.656.5-2.719.5-.93 0-1.773-.157-2.531-.47a5.578 5.578 0 0 1-1.938-1.359A6.107 6.107 0 0 1 1.25-3.765C.957-4.578.812-5.469.812-6.437c0-.977.157-1.868.47-2.672a6.048 6.048 0 0 1 1.327-2.094 6.018 6.018 0 0 1 2.047-1.36c.79-.32 1.672-.484 2.64-.484.946 0 1.759.152 2.438.453a6.398 6.398 0 0 1 1.844 1.188L11-10.61a.688.688 0 0 1-.14.156c-.055.043-.133.062-.235.062a.497.497 0 0 1-.25-.078 15.045 15.045 0 0 0-.313-.219 5.478 5.478 0 0 0-.421-.265 3.07 3.07 0 0 0-.579-.281 4.697 4.697 0 0 0-.765-.204 4.914 4.914 0 0 0-1.016-.093c-.687 0-1.32.12-1.89.36a4.332 4.332 0 0 0-1.485 1.015 4.49 4.49 0 0 0-.969 1.61c-.23.624-.343 1.327-.343 2.108 0 .805.113 1.524.344 2.157.226.625.539 1.156.937 1.593.406.43.879.758 1.422.985.55.23 1.14.344 1.766.344.382 0 .726-.02 1.03-.063.313-.05.598-.125.86-.219a3.2 3.2 0 0 0 .719-.359c.226-.145.457-.32.687-.531a.486.486 0 0 1 .297-.125zm0 0" />
                                            </symbol>
                                            <symbol id="c33ac01e-315c-4364-955c-a70a7db75776" overflow="visible">
                                                <path d="M10.344-12.89v1.453H6.188V0h-1.75v-11.438H.25v-1.453zm0 0" />
                                            </symbol>
                                            <symbol id="d5c36df3-4529-479e-9c6f-5f7e42b863d4" overflow="visible">
                                                <path d="M6.156-3.625c.063.117.114.234.157.36.05.117.101.242.156.374a2.66 2.66 0 0 1 .14-.375c.051-.125.114-.25.188-.375l3.39-6.156c.063-.113.126-.18.188-.203a.994.994 0 0 1 .281-.031h1V0H10.47v-7.688c.008-.113.02-.226.031-.343L7.062-1.75c-.125.21-.292.313-.5.313h-.187c-.21 0-.375-.102-.5-.313L2.359-8.047c.02.117.032.235.032.36.007.117.015.218.015.312V0H1.22v-10.031h1c.125 0 .219.011.281.031.063.023.125.09.188.203zm0 0" />
                                            </symbol>
                                            <symbol id="788109f1-a169-4bca-ba95-48bfa1d6160f" overflow="visible">
                                                <path d="M2.828 0h-1.36v-10.031h1.36zm0 0" />
                                            </symbol>
                                            <symbol id="e23a382f-ac18-400d-a36b-4feff4a7540e" overflow="visible">
                                                <path d="M1.922-10.031a.61.61 0 0 1 .266.047.665.665 0 0 1 .203.187l5.812 7.563a3.024 3.024 0 0 1-.047-.36v-7.438H9.36V0h-.687a.702.702 0 0 1-.281-.047.591.591 0 0 1-.204-.203L2.375-7.797c.008.117.016.23.016.344.007.117.015.219.015.312V0H1.22v-10.031zm0 0" />
                                            </symbol>
                                            <symbol id="907bb254-1d11-4943-b272-64412415c6cf" overflow="visible">
                                                <path d="M7.406-10.031v1.11H2.578v3.327h3.906v1.063H2.578v3.422h4.828V0H1.22v-10.031zm0 0" />
                                            </symbol>
                                            <symbol id="0bb990a5-98b5-4d81-a9ad-9eba62351528" overflow="visible">
                                                <path d="M2.703-4.188V0H1.36v-10.031h2.829c.632 0 1.18.07 1.64.203.469.125.852.308 1.156.547.301.242.524.531.672.875.145.344.219.73.219 1.156 0 .355-.059.688-.172 1a2.729 2.729 0 0 1-.5.828c-.21.242-.465.45-.766.625a4.136 4.136 0 0 1-1.046.39c.175.095.328.235.453.423L8.766 0H7.562a.613.613 0 0 1-.546-.281L4.422-3.875a1.042 1.042 0 0 0-.266-.234c-.093-.051-.234-.079-.422-.079zm0-.984h1.422c.395 0 .742-.047 1.047-.14.3-.094.55-.227.75-.407.207-.176.363-.383.469-.625.101-.25.156-.52.156-.812 0-.594-.2-1.04-.594-1.344-.398-.3-.984-.453-1.766-.453H2.704zm0 0" />
                                            </symbol>
                                            <symbol id="4e449954-abaf-4669-a816-025638c55161" overflow="visible">
                                                <path d="M9.469 0H8.422a.436.436 0 0 1-.297-.094.61.61 0 0 1-.172-.234L7.016-2.75h-4.5L1.578-.328a.57.57 0 0 1-.172.234.422.422 0 0 1-.281.094H.062l4.016-10.031h1.375zM2.89-3.719h3.75L5.062-7.813a6.549 6.549 0 0 1-.296-.937c-.055.188-.106.367-.157.531-.043.156-.09.297-.14.422zm0 0" />
                                            </symbol>
                                            <symbol id="298aa52f-0400-4163-8442-883f44985cca" overflow="visible">
                                                <path d="M2.578-1.14h4.344V0H1.219v-10.031h1.36zm0 0" />
                                            </symbol>
                                            <symbol id="df2d08e5-69a4-4e24-b485-a97c874aac31" overflow="visible">
                                                <path d="M6.36-8.469a.583.583 0 0 1-.141.172.289.289 0 0 1-.172.047.485.485 0 0 1-.281-.11 3.507 3.507 0 0 0-.407-.265 2.49 2.49 0 0 0-.578-.266c-.23-.082-.5-.125-.812-.125a2.4 2.4 0 0 0-.813.125c-.23.086-.422.2-.578.344a1.366 1.366 0 0 0-.36.485c-.085.187-.124.39-.124.609 0 .281.066.516.203.703.144.18.328.336.547.469.226.125.484.242.765.343.29.094.586.196.891.297.3.094.594.211.875.344.29.125.55.29.781.484.227.2.41.438.547.72.133.28.203.632.203 1.046 0 .438-.074.852-.218 1.235A2.88 2.88 0 0 1 6.03-.798a3.246 3.246 0 0 1-1.062.672c-.418.156-.89.234-1.422.234a4.484 4.484 0 0 1-1.781-.343 4.125 4.125 0 0 1-1.36-.97l.39-.64a.477.477 0 0 1 .141-.125.325.325 0 0 1 .172-.047c.102 0 .22.055.344.157.125.105.281.218.469.343.187.125.414.243.687.344.27.106.598.156.985.156.32 0 .61-.039.86-.125.25-.093.46-.218.64-.375.176-.164.312-.359.406-.578.094-.226.14-.476.14-.75 0-.3-.074-.55-.218-.75a1.606 1.606 0 0 0-.547-.484 3.275 3.275 0 0 0-.766-.328 47.103 47.103 0 0 0-.875-.282 11.055 11.055 0 0 1-.89-.343 2.992 2.992 0 0 1-.766-.485 2.134 2.134 0 0 1-.531-.75C.91-6.566.844-6.94.844-7.39c0-.351.066-.691.203-1.015a2.638 2.638 0 0 1 1.562-1.5 3.514 3.514 0 0 1 1.329-.235c.562 0 1.07.09 1.53.266.47.18.876.434 1.22.766zm0 0" />
                                            </symbol>
                                            <clipPath id="a51f1aa8-bf82-45da-b4b1-a5df1f9c6852">
                                                <path d="M20 10h25v22H20zm0 0" />
                                            </clipPath>
                                            <clipPath id="859bca5e-e9a7-4a9f-a959-bdb4a54238c2">
                                                <path d="m18.105 11.238 23.364-4.12 4.394 24.917L22.5 36.156zm0 0" />
                                            </clipPath>
                                        </defs>
                                        <path d="M5.975.643.451 11.063l5.149-.045L10.837.616zm0 0" fill="#005191" data-color="3" />
                                        <g clipPath="url(#a51f1aa8-bf82-45da-b4b1-a5df1f9c6852)" transform="scale(.35278)">
                                            <g clipPath="url(#859bca5e-e9a7-4a9f-a959-bdb4a54238c2)">
                                                <path d="m20.875 21.195 11.43 8.192 11.77 1.949-1.169-10.32-16.843-10.164zm0 0" fill="#75d4ff" data-color="4" />
                                            </g>
                                        </g>
                                        <g transform="scale(.35278)" className="fill-black dark:fill-white">
                                            <use height="100%" width="100%" y="14.167" x="45.51" xlinkHref="#c87b2d1f-afce-4567-b868-ab483c9c89ef" data-color="1" />
                                            <use height="100%" width="100%" y="14.167" x="57.048" xlinkHref="#4d617dd5-e623-47ef-a2bc-5fd67b8ea487" data-color="1" />
                                        </g>
                                        <g className="fill-black dark:fill-white" transform="scale(.35278)">
                                            <use height="100%" width="100%" y="14.167" x="68.766" xlinkHref="#79500da1-899c-42b8-9308-00a08412c44d" data-color="1" />
                                            <use height="100%" width="100%" y="14.167" x="83.67" xlinkHref="#e9b7dd90-14e4-4e6a-8c15-9b614ee90a3b" data-color="1" />
                                            <use height="100%" width="100%" y="14.167" x="93.75" xlinkHref="#c87b2d1f-afce-4567-b868-ab483c9c89ef" data-color="1" />
                                            <use height="100%" width="100%" y="14.167" x="105.288" xlinkHref="#cceea666-4c30-4e56-8c96-6d9b3b8f6c79" data-color="1" />
                                            <use height="100%" width="100%" y="14.167" x="116.286" xlinkHref="#d0b4bd97-762c-4a33-9573-8f378a95d99e" data-color="1" />
                                            <use height="100%" width="100%" y="14.167" x="129.156" xlinkHref="#c33ac01e-315c-4364-955c-a70a7db75776" data-color="1" />
                                        </g>
                                        <g transform="scale(.35278)" className="fill-black dark:fill-white">
                                            <use height="100%" width="100%" y="14.167" x="139.434" xlinkHref="#79500da1-899c-42b8-9308-00a08412c44d" data-color="1" />
                                            <use height="100%" width="100%" y="14.167" x="154.338" xlinkHref="#4d617dd5-e623-47ef-a2bc-5fd67b8ea487" data-color="1" />
                                        </g>
                                        <g transform="scale(.35278)" className="fill-black dark:fill-white">
                                            <use height="100%" width="100%" y="29.819" x="68.938" xlinkHref="#b85ec368-baae-4387-b0b9-204f644cf8f9" />
                                        </g>
                                        <g transform="scale(.35278)" className="fill-[#3f3f3f] dark:fill-[#DEDEDE]" >
                                            <use height="100%" width="100%" y="29.819" x="71.494" xlinkHref="#d5c36df3-4529-479e-9c6f-5f7e42b863d4" data-color="5" />
                                            <use height="100%" width="100%" y="29.819" x="84.654" xlinkHref="#788109f1-a169-4bca-ba95-48bfa1d6160f" data-color="5" />
                                            <use height="100%" width="100%" y="29.819" x="89.232" xlinkHref="#e23a382f-ac18-400d-a36b-4feff4a7540e" data-color="5" />
                                            <use height="100%" width="100%" y="29.819" x="100.096" xlinkHref="#907bb254-1d11-4943-b272-64412415c6cf" data-color="5" />
                                            <use height="100%" width="100%" y="29.819" x="108.51" xlinkHref="#0bb990a5-98b5-4d81-a9ad-9eba62351528" data-color="5" />
                                            <use height="100%" width="100%" y="29.819" x="117.806" xlinkHref="#4e449954-abaf-4669-a816-025638c55161" data-color="5" />
                                            <use height="100%" width="100%" y="29.819" x="127.606" xlinkHref="#298aa52f-0400-4163-8442-883f44985cca" data-color="5" />
                                            <use height="100%" width="100%" y="29.819" x="135.082" xlinkHref="#df2d08e5-69a4-4e24-b485-a97c874aac31" data-color="5" />
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                        </div>

                        <p className="mt-6 font-medium">Follow Us!</p>

                        <ul className="mt-2 flex gap-6">
                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-200 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Facebook</span>

                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-200 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Instagram</span>

                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 dark:text-gray-200 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Twitter</span>

                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <div className="flex justify-items-start">
                            <ThemeSwitch />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                        <div>
                            <p className="font-medium">Services</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> 1on1 Coaching </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Company Review </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Accounts Review </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> HR Consulting </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> SEO Optimisation </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium">Company</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> About </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Meet the Team </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Accounts Review </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium">Helpful Links</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Contact </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> FAQs </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Live Chat </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium">About</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href="#" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> About </Link>
                                </li>

                                <li>
                                    <Link href="/policy#copyright" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Copyright Policy </Link>
                                </li>

                                <li>
                                    <Link href="/policy#termsofuse" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Terms of Use </Link>
                                </li>

                                <li>
                                    <Link href="/policy#privacy" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Privacy Policy </Link>
                                </li>

                                <li>
                                    <Link href="/policy#contact" className="text-gray-700 dark:text-gray-300 transition hover:opacity-75"> Contact Us </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-200">&copy; {new Date().getFullYear()} Prospector Minerals. All rights reserved.</p>
            </div>
        </footer>
    )
}