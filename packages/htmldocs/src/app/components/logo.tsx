import { useId } from "react";

export const Logo = ({
  width = 107,
  height = 28,
}: React.SVGProps<SVGSVGElement>) => {
  const idSuffix = useId();
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 191 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.8585 44.2627H10.0403C9.65989 44.2627 9.29506 44.1116 9.02607 43.8426C8.75708 43.5736 8.60596 43.2088 8.60596 42.8284V11.2728C8.60596 10.8924 8.75708 10.5275 9.02607 10.2586C9.29506 9.98956 9.65989 9.83844 10.0403 9.83844H27.2524L37.2929 19.8789V42.8284C37.2929 43.2088 37.1418 43.5736 36.8728 43.8426C36.6038 44.1116 36.2389 44.2627 35.8585 44.2627Z"
        fill={`url(#paint0_linear_2071_2955_${idSuffix})`}
        stroke="#01543A"
        strokeWidth="1.89275"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.2524 9.83844V19.8789H37.2929"
        fill="#006646"
        stroke="#006646"
        strokeWidth="1.89275"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask0_2071_2955"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="7"
        y="8"
        width="32"
        height="38"
      >
        <path
          d="M35.8585 44.2627H10.0403C9.65989 44.2627 9.29506 44.1116 9.02607 43.8426C8.75708 43.5736 8.60596 43.2088 8.60596 42.8284V11.2728C8.60596 10.8924 8.75708 10.5275 9.02607 10.2586C9.29506 9.98956 9.65989 9.83844 10.0403 9.83844H27.2524L37.2929 19.8789V42.8284C37.2929 43.2088 37.1418 43.5736 36.8728 43.8426C36.6038 44.1116 36.2389 44.2627 35.8585 44.2627Z"
          fill={`url(#paint1_linear_2071_2955_${idSuffix})`}
          stroke="#01543A"
          strokeWidth="1.89275"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.2524 9.83844V19.8789H37.2929"
          fill="#006646"
          stroke="#006646"
          strokeWidth="1.89275"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask={`url(#mask0_2071_2955_${idSuffix})`}>
        <path
          d="M41.0622 41.0869H16.5156L41.0622 45.6263V41.0869Z"
          fill="#023E2B"
        />
      </g>
      <path
        d="M43.4298 40.1617H17.6116C17.2312 40.1617 16.8663 40.0106 16.5974 39.7416C16.3284 39.4726 16.1772 39.1078 16.1772 38.7274V7.17177C16.1772 6.79136 16.3284 6.42653 16.5974 6.15754C16.8663 5.88855 17.2312 5.73743 17.6116 5.73743H34.8237L44.8642 15.7778V38.7274C44.8642 39.1078 44.713 39.4726 44.444 39.7416C44.1751 40.0106 43.8102 40.1617 43.4298 40.1617Z"
        fill={`url(#paint2_linear_2071_2955_${idSuffix})`}
        stroke="#057A55"
        strokeWidth="1.89275"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.8237 5.73743V15.7778H44.8642"
        fill={`url(#paint3_linear_2071_2955_${idSuffix})`}
        stroke={`url(#paint4_linear_2071_2955_${idSuffix})`}
        strokeWidth="1.89275"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.758 31.0637C29.3799 31.0637 29.1908 30.8746 29.1908 30.4965V29.6232C29.1908 29.2451 29.3799 29.056 29.758 29.056H36.4922C36.8703 29.056 37.0594 29.2451 37.0594 29.6232V30.4965C37.0594 30.8746 36.8703 31.0637 36.4922 31.0637H29.758Z"
        fill="white"
      />
      <path
        d="M23.9351 28.406V28.415C23.737 28.4931 23.575 28.4931 23.4489 28.415C23.3229 28.337 23.2599 28.184 23.2599 27.9559V26.6865C23.2599 26.3804 23.4129 26.1643 23.719 26.0383L27.8873 24.3817V24.2287L23.719 22.5902C23.4129 22.5121 23.2599 22.2991 23.2599 21.9509V20.6725C23.2599 20.4625 23.3229 20.3184 23.4489 20.2404C23.575 20.1624 23.737 20.1624 23.9351 20.2404L29.976 23.0223C30.2521 23.1363 30.3962 23.3584 30.4082 23.6885V24.9759C30.4082 25.282 30.2641 25.5041 29.976 25.6421L23.9351 28.406Z"
        fill="white"
      />
      <path
        d="M67.4541 26.1144V35.3163H63.7529V14.377H67.3723V22.2803H67.5564C67.9244 21.3942 68.4936 20.6956 69.2638 20.1843C70.0409 19.6663 71.0292 19.4073 72.2289 19.4073C73.3194 19.4073 74.2703 19.6356 75.0814 20.0923C75.8926 20.549 76.5196 21.217 76.9627 22.0963C77.4126 22.9756 77.6375 24.0491 77.6375 25.3169V35.3163H73.9363V25.8895C73.9363 24.833 73.6637 24.0116 73.1184 23.4254C72.5799 22.8324 71.8233 22.5359 70.8486 22.5359C70.1942 22.5359 69.608 22.6791 69.09 22.9653C68.5788 23.2448 68.1766 23.6504 67.8835 24.182C67.5973 24.7137 67.4541 25.3578 67.4541 26.1144Z"
        className="fill-foreground"
      />
      <path
        d="M89.2523 19.6118V22.4746H80.2242V19.6118H89.2523ZM82.4531 15.8492H86.1543V30.5927C86.1543 31.0902 86.2293 31.4719 86.3793 31.7378C86.536 31.9968 86.7405 32.174 86.9927 32.2694C87.2449 32.3649 87.5244 32.4126 87.8311 32.4126C88.0629 32.4126 88.2742 32.3955 88.465 32.3615C88.6627 32.3274 88.8126 32.2967 88.9149 32.2694L89.5386 35.1629C89.3409 35.2311 89.058 35.306 88.6899 35.3878C88.3287 35.4696 87.8856 35.5174 87.3608 35.531C86.4338 35.5582 85.5988 35.4185 84.8558 35.1118C84.1129 34.7982 83.5233 34.3143 83.087 33.6599C82.6576 33.0056 82.4463 32.1876 82.4531 31.2061V15.8492Z"
        className="fill-foreground"
      />
      <path
        d="M92.3477 35.3163V19.6118H95.8853V22.2803H96.0693C96.3965 21.3806 96.9384 20.6785 97.695 20.1741C98.4516 19.6629 99.3547 19.4073 100.404 19.4073C101.468 19.4073 102.364 19.6663 103.093 20.1843C103.83 20.6956 104.348 21.3942 104.647 22.2803H104.811C105.159 21.4078 105.745 20.7126 106.57 20.1946C107.401 19.6697 108.386 19.4073 109.524 19.4073C110.969 19.4073 112.149 19.864 113.062 20.7774C113.975 21.6907 114.432 23.0233 114.432 24.775V35.3163H110.721V25.3476C110.721 24.3729 110.462 23.6606 109.944 23.2107C109.426 22.754 108.792 22.5257 108.042 22.5257C107.149 22.5257 106.45 22.8052 105.946 23.3641C105.448 23.9162 105.2 24.6353 105.2 25.5214V35.3163H101.57V25.1942C101.57 24.3831 101.325 23.7356 100.834 23.2516C100.35 22.7677 99.716 22.5257 98.9321 22.5257C98.4005 22.5257 97.9165 22.662 97.4803 22.9347C97.044 23.2005 96.6964 23.5788 96.4374 24.0696C96.1784 24.5535 96.0489 25.1193 96.0489 25.7668V35.3163H92.3477Z"
        className="fill-foreground"
      />
      <path d="M121.888 14.377V35.3163H118.187V14.377H121.888Z" className="fill-foreground" />
      <path
        d="M131.522 35.5923C130.288 35.5923 129.184 35.2754 128.209 34.6415C127.235 34.0076 126.464 33.0874 125.899 31.8809C125.333 30.6745 125.05 29.209 125.05 27.4845C125.05 25.7395 125.336 24.2672 125.909 23.0676C126.488 21.8611 127.269 20.9512 128.25 20.3377C129.232 19.7174 130.326 19.4073 131.532 19.4073C132.452 19.4073 133.209 19.5641 133.802 19.8776C134.395 20.1843 134.865 20.5558 135.213 20.9921C135.561 21.4215 135.83 21.827 136.021 22.2088H136.174V14.377H139.885V35.3163H136.246V32.842H136.021C135.83 33.2237 135.554 33.6293 135.193 34.0587C134.831 34.4813 134.354 34.8425 133.761 35.1425C133.168 35.4424 132.422 35.5923 131.522 35.5923ZM132.555 32.5557C133.339 32.5557 134.006 32.3444 134.559 31.9218C135.111 31.4924 135.53 30.896 135.816 30.1326C136.102 29.3692 136.246 28.4796 136.246 27.464C136.246 26.4484 136.102 25.5657 135.816 24.8159C135.537 24.0662 135.121 23.4834 134.569 23.0676C134.024 22.6518 133.352 22.4439 132.555 22.4439C131.73 22.4439 131.041 22.6586 130.489 23.088C129.937 23.5175 129.521 24.1105 129.242 24.8671C128.963 25.6237 128.823 26.4893 128.823 27.464C128.823 28.4456 128.963 29.3214 129.242 30.0917C129.528 30.8551 129.947 31.4583 130.5 31.9014C131.059 32.3376 131.744 32.5557 132.555 32.5557Z"
        className="fill-foreground"
      />
      <path
        d="M150.68 35.623C149.146 35.623 147.817 35.2856 146.692 34.6108C145.568 33.936 144.695 32.992 144.075 31.7787C143.461 30.5654 143.155 29.1476 143.155 27.5254C143.155 25.9031 143.461 24.4819 144.075 23.2619C144.695 22.0418 145.568 21.0943 146.692 20.4195C147.817 19.7447 149.146 19.4073 150.68 19.4073C152.213 19.4073 153.543 19.7447 154.667 20.4195C155.792 21.0943 156.661 22.0418 157.274 23.2619C157.895 24.4819 158.205 25.9031 158.205 27.5254C158.205 29.1476 157.895 30.5654 157.274 31.7787C156.661 32.992 155.792 33.936 154.667 34.6108C153.543 35.2856 152.213 35.623 150.68 35.623ZM150.7 32.658C151.532 32.658 152.227 32.4296 152.786 31.9729C153.345 31.5094 153.761 30.8892 154.033 30.1121C154.313 29.3351 154.452 28.4694 154.452 27.5152C154.452 26.5541 154.313 25.685 154.033 24.908C153.761 24.1241 153.345 23.5004 152.786 23.0369C152.227 22.5734 151.532 22.3417 150.7 22.3417C149.848 22.3417 149.139 22.5734 148.574 23.0369C148.015 23.5004 147.595 24.1241 147.316 24.908C147.043 25.685 146.907 26.5541 146.907 27.5152C146.907 28.4694 147.043 29.3351 147.316 30.1121C147.595 30.8892 148.015 31.5094 148.574 31.9729C149.139 32.4296 149.848 32.658 150.7 32.658Z"
        className="fill-foreground"
      />
      <path
        d="M168.196 35.623C166.629 35.623 165.283 35.2788 164.158 34.5904C163.04 33.9019 162.178 32.9511 161.571 31.7378C160.971 30.5177 160.671 29.1135 160.671 27.5254C160.671 25.9304 160.978 24.5228 161.592 23.3027C162.205 22.0758 163.071 21.1216 164.189 20.4399C165.313 19.7515 166.642 19.4073 168.176 19.4073C169.451 19.4073 170.579 19.6425 171.56 20.1128C172.549 20.5763 173.336 21.234 173.922 22.0861C174.508 22.9313 174.842 23.9196 174.924 25.0511H171.386C171.243 24.2945 170.903 23.664 170.364 23.1596C169.832 22.6484 169.12 22.3928 168.227 22.3928C167.471 22.3928 166.806 22.5973 166.233 23.0062C165.661 23.4084 165.214 23.9878 164.894 24.7444C164.58 25.501 164.424 26.4075 164.424 27.464C164.424 28.5342 164.58 29.4544 164.894 30.2246C165.208 30.988 165.647 31.5776 166.213 31.9934C166.786 32.4024 167.457 32.6068 168.227 32.6068C168.772 32.6068 169.26 32.5046 169.689 32.3001C170.125 32.0888 170.49 31.7855 170.783 31.3902C171.076 30.9948 171.277 30.5143 171.386 29.9485H174.924C174.835 31.0596 174.508 32.0445 173.943 32.9033C173.377 33.7554 172.607 34.4234 171.632 34.9073C170.657 35.3844 169.512 35.623 168.196 35.623Z"
        className="fill-foreground"
      />
      <path
        d="M190.376 23.7628L187.001 24.1309C186.906 23.7901 186.739 23.4697 186.5 23.1698C186.269 22.8699 185.955 22.6279 185.56 22.4439C185.165 22.2599 184.681 22.1679 184.108 22.1679C183.338 22.1679 182.69 22.3348 182.165 22.6688C181.647 23.0028 181.392 23.4357 181.399 23.9673C181.392 24.424 181.559 24.7955 181.9 25.0818C182.247 25.3681 182.82 25.6032 183.617 25.7872L186.296 26.3598C187.782 26.6802 188.886 27.188 189.609 27.8832C190.338 28.5785 190.706 29.4884 190.713 30.6131C190.706 31.6015 190.416 32.4739 189.844 33.2305C189.278 33.9803 188.491 34.5665 187.482 34.9891C186.473 35.4117 185.314 35.623 184.006 35.623C182.084 35.623 180.536 35.2208 179.364 34.4165C178.192 33.6054 177.493 32.4773 177.268 31.0323L180.877 30.6847C181.041 31.3936 181.388 31.9286 181.92 32.2899C182.452 32.6511 183.144 32.8318 183.996 32.8318C184.875 32.8318 185.58 32.6511 186.112 32.2899C186.65 31.9286 186.92 31.4822 186.92 30.9505C186.92 30.5006 186.746 30.1292 186.398 29.8361C186.057 29.543 185.526 29.318 184.803 29.1613L182.125 28.5989C180.618 28.2854 179.504 27.7571 178.781 27.0142C178.059 26.2644 177.701 25.3169 177.708 24.1718C177.701 23.2039 177.963 22.3655 178.495 21.6566C179.033 20.9409 179.78 20.3888 180.734 20.0003C181.695 19.605 182.803 19.4073 184.057 19.4073C185.897 19.4073 187.346 19.7992 188.402 20.5831C189.466 21.367 190.123 22.4269 190.376 23.7628Z"
        className="fill-foreground"
      />
      <defs>
        <linearGradient
          id={`paint0_linear_2071_2955_${idSuffix}`}
          x1="32.7272"
          y1="41.9465"
          x2="10.1407"
          y2="11.5238"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01543A" />
          <stop offset="1" stop-color="#086548" />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_2071_2955_${idSuffix}`}
          x1="32.7272"
          y1="41.9465"
          x2="10.1407"
          y2="11.5238"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#01543A" />
          <stop offset="1" stopColor="#086548" />
        </linearGradient>
        <linearGradient
          id={`paint2_linear_2071_2955_${idSuffix}`}
          x1="41.4856"
          y1="40.5635"
          x2="21.2038"
          y2="3.22669"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#057A55" />
          <stop offset="1" stop-color="#1D9A72" />
        </linearGradient>
        <linearGradient
          id={`paint3_linear_2071_2955_${idSuffix}`}
          x1="35.0323"
          y1="15.6723"
          x2="41.0384"
          y2="5.82418"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#006646" />
          <stop offset="1" stopColor="#20B686" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2071_2955"
          x1="35.0323"
          y1="16.1332"
          x2="43.3109"
          y2="5.82418"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#006646" />
          <stop offset="0.0001" stopColor="#026445" />
          <stop offset="1" stopColor="#17936C" />
        </linearGradient>
      </defs>
    </svg>
  );
};
