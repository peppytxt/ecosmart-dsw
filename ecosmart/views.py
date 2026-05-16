from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario, ConteudoEducativo 
import json
from django.db.models import Count
from django.contrib.auth.hashers import make_password, check_password

@csrf_exempt
def api_usuarios(request):
    if request.method == 'GET':
        usuarios = list(Usuario.objects.all().values())
        for u in usuarios:
            u['status'] = 'ativo' if u['status'] else 'inativo'
        return JsonResponse(usuarios, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            user = Usuario.objects.create(
                nome=data.get('nome'),
                email=data.get('email'),
                telefone=data.get('telefone'), 
                endereco=data.get('endereco'),  
                senha=make_password(data.get('senha', 'EcoSmart123')),
                perfil=data.get('perfil', 'UC'),
                status=(data.get('status') == 'ativo')
            )
            
            return JsonResponse({
                "id": user.id,
                "nome": user.nome,
                "email": user.email,
                "telefone": user.telefone,
                "endereco": user.endereco,
                "perfil": user.perfil,
                "status": "ativo" if user.status else "inativo"
            }, status=201)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def api_conteudos(request):
    if request.method == 'GET':
        conteudos = ConteudoEducativo.objects.all()
        lista_conteudos = []
        for c in conteudos:
            lista_conteudos.append({
                "id": c.id,
                "nome": c.nome,
                "categoria": c.categoria,
                "descricao": c.descricao,
                "como_descartar": c.como_descartar.split('\n') if c.como_descartar else [],
                "cuidados": c.cuidados.split('\n') if c.cuidados else []
            })
        return JsonResponse(lista_conteudos, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            novo_conteudo = ConteudoEducativo.objects.create(
                nome=data.get('nome'),
                categoria=data.get('categoria'),
                descricao=data.get('descricao'),
                como_descartar=data.get('comoDescartar'),
                cuidados=data.get('cuidados', '')
            )
            return JsonResponse({"id": novo_conteudo.id, "message": "Criado com sucesso!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


    elif request.method == 'DELETE':
        id_conteudo = request.GET.get('id')
        if id_conteudo:
            ConteudoEducativo.objects.filter(id=id_conteudo).delete()
            return JsonResponse({"message": "Excluído!"}, status=204)
        return JsonResponse({"error": "ID não fornecido"}, status=400)
    
@csrf_exempt
def api_signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            usuario = Usuario.objects.create(
                nome=data.get('nome'),
                email=data.get('email'),
                telefone=data.get('telefone'),
                endereco=data.get('endereco'),
                senha=make_password(data.get('senha')),
                perfil=data.get('perfil'),
                status=True
            )

            return JsonResponse({
                'id': usuario.id,
                'nome': usuario.nome,
                'email': usuario.email,
                'telefone': usuario.telefone,
                'endereco': usuario.endereco,
                'perfil': usuario.perfil,
                'status': usuario.status,
                'created_at': usuario.created_at.isoformat() if usuario.created_at else None
            }, status=201)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        senha = data.get('senha')

        usuario = Usuario.objects.filter(email=email).first()
        
        if usuario and check_password(senha, usuario.senha):
            return JsonResponse({
                'id': usuario.id,
                'nome': usuario.nome,
                'email': usuario.email,
                'telefone': usuario.telefone,
                'endereco': usuario.endereco,
                'perfil': usuario.perfil,
                'status': usuario.status
            })
        else:
            return JsonResponse({'error': 'Credenciais inválidas'}, status=401)


@csrf_exempt
def api_update_perfil(request, user_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        Usuario.objects.filter(id=user_id).update(
            nome=data.get('nome'),
            telefone=data.get('telefone'),
            endereco=data.get('endereco')
        )
        return JsonResponse({'message': 'Atualizado com sucesso'})
    

@csrf_exempt
def api_dashboard_metrics(request):
    if request.method == 'GET':
        try:
            # Total de usuários por tipo de perfil (UA, UC, UP, UE)
            perfis = Usuario.objects.values('perfil').annotate(total=Count('perfil'))
       
            usuarios_por_perfil = {item['perfil']: item['total'] for item in perfis}
            
            total_usuarios = Usuario.objects.count()
        
            total_conteudos = ConteudoEducativo.objects.count()

            # Monta o painel de métricas
            metrics = {
                'total_usuarios': total_usuarios,
                'total_conteudos': total_conteudos,
                'perfil_comum': usuarios_por_perfil.get('UC', 0),
                'perfil_premium': usuarios_por_perfil.get('UP', 0),
                'perfil_empresa': usuarios_por_perfil.get('UE', 0),
                'perfil_admin': usuarios_por_perfil.get('UA', 0),
            }
            
            return JsonResponse(metrics, status=200)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
            
    return JsonResponse({'error': 'Método não permitido'}, status=405)


@csrf_exempt
def api_usuario_detalhe(request, user_id):
    try:
        usuario = Usuario.objects.get(id=user_id)
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuário não encontrado'}, status=404)

    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            
            # Captura todas as propriedades enviadas pelo React
            usuario.nome = data.get('nome', usuario.nome)
            usuario.email = data.get('email', usuario.email)
            usuario.telefone = data.get('telefone', usuario.telefone)
            usuario.endereco = data.get('endereco', usuario.endereco)
            usuario.perfil = data.get('perfil', usuario.perfil)
            usuario.status = data.get('status', usuario.status)
            
            usuario.save() 
            
            return JsonResponse({
                'id': usuario.id,
                'nome': usuario.nome,
                'email': usuario.email,
                'telefone': usuario.telefone,
                'endereco': usuario.endereco,
                'perfil': usuario.perfil,
                'status': usuario.status,
                'created_at': usuario.created_at.isoformat() if usuario.created_at else None
            }, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    # OPERAÇÃO DE DELEÇÃO (DELETE)
    elif request.method == 'DELETE':
        try:
            usuario.delete() # Remove diretamente da tabela do Supabase
            return JsonResponse({'message': 'Usuário deletado com sucesso'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)

