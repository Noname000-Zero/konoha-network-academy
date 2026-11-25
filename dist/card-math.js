import {W} from './worked.js';
// Bài chuyển giao: dữ kiện khác thẻ đã được hướng dẫn, tự làm trọn vẹn.
const p=(prompt,answer,symbols,conversion,formula,substitution,integer=true)=>({prompt,answer,unit:'theo đơn vị trong đề',grading:{integer,absTol:integer?0:.001,relTol:0},worked:W(prompt,symbols,conversion,formula,substitution,String(answer))});
export const transferProblems={
l3q0:p('Gói 1500 byte qua link 2 Mbps: tính trễ truyền theo ms.',6,'L: bit/gói; R: bit/s; t: giây.','L=12000 bit; R=2×10⁶ bit/s; 1 s=1000 ms.','t=L/R','12000/(2×10⁶)=0,006 s=6 ms',false),
l15q1:p('UDP segment dài 48 byte, header 8 byte. Payload dài bao nhiêu byte?',40,'T: toàn segment; H: header; D: dữ liệu.','Các độ dài đều tính bằng byte.','D=T−H','48−8=40'),
l19q0:p('TCP nhận liên tục byte 0–1199. ACK tiếp theo là bao nhiêu?',1200,'b: byte cuối liên tục; ACK: byte mong đợi.','Số thứ tự byte bắt đầu từ 0.','ACK=b+1','1199+1=1200'),
l21q1:p('IPv4 /26 có bao nhiêu bit host?',6,'p: bit mạng; h: bit host.','IPv4 có 32 bit.','h=32−p','32−26=6'),
l22q0:p('Chia mạng /24 thành 8 subnet bằng nhau: nhập số prefix mới sau dấu /.',27,'s: bit mượn; p: prefix cũ.','8=2³ nên mượn 3 bit.','p_new=p+ceil(log₂k)','24+3=27'),
l22q1:p('Một subnet /26 thông thường có bao nhiêu host dùng được?',62,'h: bit host; U: số host dùng được.','h=32−26=6.','U=2^h−2','2⁶−2=62'),
'propagation-value':p('Link dài 1200 km, tốc độ tín hiệu 3×10⁸ m/s. Trễ lan truyền là bao nhiêu ms?',4,'d: chiều dài (m); s: tốc độ (m/s).','1200 km=1200000 m.','t=d/s','1200000/(3×10⁸)=0,004 s=4 ms',false),
'pipeline-duration':p('4 gói 1200 bit qua 3 link cùng 2400 bit/s. Bỏ mọi trễ ngoài truyền; store-and-forward. Nhận hết sau bao nhiêu giây?',3,'P: gói; N: link; L: bit; R: bit/s.','Đã cùng hệ bit–giây.','T=(N+P−1)L/R','(3+4−1)×1200/2400=3 s',false),
'queue-duration':p('Còn 1/4 gói đang phát và 3 gói chờ trước; gói cùng cỡ 1000 byte, link 2 Mbps. Gói mới đợi bao nhiêu ms?',13,'f: phần gói còn phát; n: gói chờ trước; L: bit/gói.','L=8000 bit; R=2×10⁶ bit/s.','t_q=(f+n)L/R','(0,25+3)×8000/(2×10⁶)=0,013 s=13 ms',false),
'traffic-intensity':p('L=2000 bit/gói, a=200 gói/s, R=1 Mbps. Tính ρ không đơn vị.',.4,'L: bit/gói; a: gói/s; R: bit/s.','R=10⁶ bit/s.','ρ=La/R','2000×200/10⁶=0,4',false),
'file-transfer-time':p('Tệp 6 megabit qua thông lượng 2 Mbps. Bỏ chi phí khởi động. Mất bao nhiêu giây?',3,'F: bit của tệp; R: thông lượng bit/s.','F=6×10⁶ bit; R=2×10⁶ bit/s.','t=F/R','6×10⁶/(2×10⁶)=3 s',false),
'http-object-count':p('Một HTML và 5 ảnh khác nhau, không cache; non-persistent HTTP một TCP/đối tượng. Cần bao nhiêu TCP?',6,'O: tổng đối tượng; C: kết nối.','Đếm đối tượng; không đổi bit/byte.','C=1+số ảnh','1+5=6'),
'http-serial-rtt':p('RTT=30 ms, phát nội dung 4 ms. Bỏ DNS. Tính 2RTT+t_trans theo ms.',64,'RTT: đi-về; t_trans: thời gian phát.','Đều ở ms.','T=2RTT+t_trans','2×30+4=64 ms',false),
'checksum-wrap':p('Hai từ 16 bit 0001 và 0002 (hex). Tính checksum bù 1 và nhập kết quả dưới dạng thập phân.',65532,'S: tổng bù 1; C: checksum 16 bit.','0001=1; 0002=2; FFFF=65535.','C=65535−fold16(S)','S=1+2=3; C=65535−3=65532 (FFFC hex)'),
'checksum-ascii':p('Một byte có giá trị hex 43. Giá trị thập phân của byte là bao nhiêu?',67,'q,r: hai chữ số hex.','Hex 43 gồm 4 và 3.','N=16q+r','4×16+3=67'),
'stopwait-utilization':p('Thời gian phát gói 2 ms, RTT=18 ms. Bỏ phát ACK. Tính hiệu suất theo %. ',10,'t: phát gói; U: phần thời gian sender phát.','Hai thời gian cùng ms; tỷ lệ nhân 100 ra %.','U=t/(RTT+t)×100','2/(18+2)×100=10%',false),
'tcp-data-offset':p('TCP data offset=7 từ 32 bit. Header dài bao nhiêu byte?',28,'o: số từ; H: byte header.','1 từ 32 bit=4 byte.','H=4o','4×7=28 byte'),
'mss-segment-count':p('Có 6500 byte dữ liệu, MSS=1200 byte. Tối thiểu bao nhiêu segment dữ liệu?',6,'F: dữ liệu tổng; MSS: dữ liệu tối đa/segment.','Cùng byte; không cộng header vào MSS.','n=ceil(F/MSS)','ceil(6500/1200)=6'),
'rwnd-buffer':p('Buffer nhận 8192 byte, có 2048 byte chưa đọc. rwnd theo mô hình đơn giản là bao nhiêu byte?',6144,'B: dung lượng buffer; used: đang chiếm.','Đều theo byte.','rwnd=B−used','8192−2048=6144'),
'two-window-limits':p('rwnd=3000 byte, cwnd=7000 byte, chưa có dữ liệu đang bay. Giới hạn đang bay là bao nhiêu byte?',3000,'rwnd: bảo vệ bên nhận; cwnd: bảo vệ mạng.','Cùng byte.','W=min(rwnd,cwnd)','min(3000,7000)=3000'),
'timeout-threshold':p('Theo mô hình cổ điển, timeout ở cwnd=32 MSS. Ngưỡng mới bằng một nửa: bao nhiêu MSS?',16,'cwnd: cửa sổ; ssthresh: ngưỡng.','Đếm bằng MSS, không đổi sang byte.','ssthresh=cwnd/2','32/2=16'),
'mask20':p('Mask /22 là 255.255.X.0. Nhập giá trị X.',252,'p: số bit 1; X: octet mask thứ ba.','22=8+8+6; 6 bit 1 ở đầu octet.','X=128+64+32+16+8+4','11111100₂=252'),
'network27-value':p('IP 203.178.142.170/27 thuộc mạng 203.178.142.X. Nhập X.',160,'B: địa chỉ/block; X: octet cuối mạng.','h=5; B=2⁵=32.','X=floor(octet/B)×B','floor(170/32)×32=5×32=160'),
'broadcast26-value':p('Mạng 133.27.4.192/26 có broadcast 133.27.4.X. Nhập X.',255,'B: số địa chỉ trong block.','h=6; B=64.','Broadcast=network+B−1','192+64−1=255'),
'isp-aggregate-count':p('Một khối /19 chia thành các khối /22 không trùng. Có bao nhiêu khối /22?',8,'p: prefix lớn; q: prefix khối con.','q−p=22−19=3 bit.','K=2^(q−p)','2³=8'),
'ihl-bytes':p('IPv4 IHL=6 từ 32 bit. Header dài bao nhiêu byte?',24,'IHL: số từ; H: byte header.','32 bit=4 byte.','H=4×IHL','4×6=24'),
'ip-payload-size':p('IPv4 total length=900 byte, IHL=6. Payload dài bao nhiêu byte?',876,'T: tổng datagram; H: header; D: dữ liệu.','H=6×4=24 byte.','D=T−H','900−24=876'),
'bellman-ford-value':p('Tới đích qua v tốn 2+4, qua x tốn 3+1. Chi phí tốt nhất là bao nhiêu?',4,'c(u,n): tới láng giềng; D_n(z): giá còn lại.','Cùng đơn vị chi phí.','D_u(z)=min_n[c(u,n)+D_n(z)]','min(2+4,3+1)=min(6,4)=4')
};
const units={'l3q0':'ms','l15q1':'byte','l19q0':'số thứ tự byte','l21q1':'bit','l22q0':'prefix','l22q1':'host','propagation-value':'ms','pipeline-duration':'s','queue-duration':'ms','traffic-intensity':'không đơn vị','file-transfer-time':'s','http-object-count':'kết nối','http-serial-rtt':'ms','checksum-wrap':'thập phân','checksum-ascii':'thập phân','stopwait-utilization':'%','tcp-data-offset':'byte','mss-segment-count':'segment','rwnd-buffer':'byte','two-window-limits':'byte','timeout-threshold':'MSS','mask20':'giá trị octet','network27-value':'giá trị octet','broadcast26-value':'giá trị octet','isp-aggregate-count':'khối','ihl-bytes':'byte','ip-payload-size':'byte','bellman-ford-value':'chi phí'};
Object.entries(transferProblems).forEach(([id,p])=>{p.unit=units[id];p.worked.result=p.answer+' '+p.unit});
