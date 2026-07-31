:root{ --app-w: 480px; }
@media (min-width: 640px){
  html{ background:#EDEAE0; }
  body{
    max-width:var(--app-w); margin:0 auto; min-height:100vh;
    box-shadow:0 0 50px rgba(0,0,0,0.18);
  }
  #billbar{ left:50%; right:auto; width:100%; max-width:var(--app-w); transform:translateX(-50%); }
  .fab{ left:calc(50% - (var(--app-w) / 2) + 14px); }
  .search-wrap, .chips-wrapper{ max-width:var(--app-w); margin-left:auto; margin-right:auto; }
}
